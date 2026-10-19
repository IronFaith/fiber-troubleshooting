import {spanishMessages} from './spanish.mjs?v=13';
import {frenchMessages} from './french.mjs?v=12';
import {arabicMessages} from './arabic.mjs?v=11';
export const languages=Object.freeze({en:'English',es:'Español',fr:'Français',ar:'العربية'});
export const isLanguage=value=>Object.hasOwn(languages,value);
export const languageDirection=language=>language==='ar'?'rtl':'ltr';
export const languageKey='fiber-language-v1';
const clean=value=>String(value).replace(/\s+/g,' ').trim();
const escapeRegex=value=>value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
function compileCatalog(messages) {
  const exact=new Map(),patterns=[];
  for(const [english,translated] of messages) {
    const source=clean(english);
    if(!/\{\d+\}/.test(source)) {exact.set(source,translated);continue;}
    if(/\{\d+\}\{\d+\}/.test(source)) continue; // Adjacent fields have ambiguous boundaries.
    const ids=[];let start=0,regex='';
    for(const hole of source.matchAll(/\{(\d+)\}/g)) {
      const next=source.slice(hole.index+hole[0].length);
      regex+=escapeRegex(source.slice(start,hole.index))+(next.startsWith('/')?'([^\\s/]+)':'(.+?)');ids.push(hole[1]);start=hole.index+hole[0].length;
    }
    regex+=escapeRegex(source.slice(start));
    const fixed=source.replace(/\{\d+\}/g,'').replace(/[^a-zA-Z]/g,'').length;
    if(fixed>=3||source==='“I’m {0}”'||source==='{0} to +{1}') patterns.push({regex:new RegExp('^'+regex+'$'),ids,translated,fixed});
  }
  patterns.sort((a,b)=>b.fixed-a.fixed);
  return {exact,patterns,cache:new Map()};
}
const catalogs=new Map([['es',compileCatalog(spanishMessages)],['fr',compileCatalog(frenchMessages)],['ar',compileCatalog(arabicMessages)]]);
export function getLanguage() {
  const language=typeof document!=='undefined'?document.documentElement.lang:'en';
  return isLanguage(language)?language:'en';
}
export function readLanguage(storage,query='') {
  const requested=new URLSearchParams(query).get('lang');
  if(isLanguage(requested)) return requested;
  try {const saved=storage?.getItem(languageKey);return isLanguage(saved)?saved:'en';} catch {return 'en';}
}
export function saveLanguage(storage,language) {
  if(!isLanguage(language)) return false;
  try {storage?.setItem(languageKey,language);return Boolean(storage);} catch {return false;}
}
export function translate(value,language=getLanguage(),depth=0) {
  const original=String(value);
  const catalog=catalogs.get(language);
  if(!catalog||!original.trim()) return original;
  const {exact,patterns,cache}=catalog;
  const source=clean(original);
  let result=cache.get(source)??exact.get(source);
  if(result===undefined&&depth<5) {
    const end=source.search(/(?<=[.!?])\s+/u);
    if(end>0) {
      const first=source.slice(0,end),known=exact.get(first);
      if(known!==undefined) result=known+' '+translate(source.slice(end).trim(),language,depth+1);
    }
  }
  if(result===undefined&&depth<5) {
    for(const pattern of patterns) {
      const match=pattern.regex.exec(source);if(!match)continue;
      if(pattern.fixed<=8&&match.slice(1).some(part=>part.length>40||/[.!?]/.test(part)))continue;
      const parts=Object.fromEntries(pattern.ids.map((id,i)=>[id,translate(match[i+1],language,depth+1)]));
      result=pattern.translated.replace(/\{(\d+)\}/g,(all,id)=>parts[id]??all);break;
    }
  }
  if(result===undefined&&depth<5) {
    const sentences=source.split(/(?<=[.!?])(?<!\d\.)\s+(?=[A-Z])/u);
    if(sentences.length>1) {
      const translated=[];
      for(let i=0;i<sentences.length;) {
        let end=i+1;
        for(let j=sentences.length;j>i+1;j--) if(exact.has(sentences.slice(i,j).join(' '))){end=j;break;}
        translated.push(translate(sentences.slice(i,end).join(' '),language,depth+1));i=end;
      }
      const joined=translated.join(' ');if(joined!==source)result=joined;
    } else if(source.endsWith('.')) {
      const base=source.slice(0,-1),translated=translate(base,language,depth+1);
      if(translated!==base)result=translated+'.';
    }
  }
  if(result===undefined&&depth<5) {
    const prefix=source.match(/^([✓↳▶←→]\s+)(.+)$/u);
    if(prefix) {const tail=translate(prefix[2],language,depth+1);if(tail!==prefix[2])result=prefix[1]+tail;}
    else if(source.includes(' · ')) {
      const pieces=source.split(' · '),translated=pieces.map(piece=>translate(piece,language,depth+1));
      if(translated.some((piece,i)=>piece!==pieces[i]))result=translated.join(' · ');
    } else if(/[:↗→]$/.test(source)) {
      const tail=source.match(/\s*[:↗→]$/)[0],body=source.slice(0,-tail.length),translated=translate(body,language,depth+1);
      if(translated!==body)result=translated+tail;
    }
  }
  if(result===undefined) return original;
  if(cache.size>5000)cache.clear();cache.set(source,result);
  return original.match(/^\s*/)[0]+result+original.match(/\s*$/)[0];
}
export const translateLines=(value,language=getLanguage())=>String(value).split('\n').map(line=>translate(line,language)).join('\n');

// Isolate technical runs for display in Arabic, without changing stored values
// or translated message keys. Also keep signs, slash ports and path arrows together.
const technicalToken=String.raw`(?:[+−-]?/?[0-9]+(?:[./–-][0-9]+)*(?![A-Za-z0-9])|[A-Za-z0-9][A-Za-z0-9]*(?:[._/-][A-Za-z0-9]+)*)`;
const technicalRuns=new RegExp(String.raw`\u2066[^\u2069]*\u2069|${technicalToken}(?:(?:[ \t]+|[ \t]*[/→←↔=–][ \t]*)${technicalToken})*`,'g');
export function formatBidi(value,language=getLanguage()) {
  const text=String(value);
  if(languageDirection(language)!=='rtl') return text;
  return text.replace(technicalRuns,run=>run.startsWith('\u2066')?run:`\u2066${run}\u2069`);
}
