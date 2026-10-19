import {spanishMessages} from './spanish.mjs?v=1';
export const languageKey='fiber-language-v1';
const clean=value=>String(value).replace(/\s+/g,' ').trim();
const escapeRegex=value=>value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const exact=new Map(),patterns=[];
for(const [english,spanish] of spanishMessages) {
  const source=clean(english);
  if(!/\{\d+\}/.test(source)) {exact.set(source,spanish);continue;}
  if(/\{\d+\}\{\d+\}/.test(source)) continue; // Adjacent fields have ambiguous boundaries.
  const ids=[];let start=0,regex='';
  for(const hole of source.matchAll(/\{(\d+)\}/g)) {
    const next=source.slice(hole.index+hole[0].length);
    regex+=escapeRegex(source.slice(start,hole.index))+(next.startsWith('/')?'([^\\s/]+)':'(.+?)');ids.push(hole[1]);start=hole.index+hole[0].length;
  }
  regex+=escapeRegex(source.slice(start));
  const fixed=source.replace(/\{\d+\}/g,'').replace(/[^a-zA-Z]/g,'').length;
  if(fixed>=3||source==='“I’m {0}”'||source==='{0} to +{1}') patterns.push({regex:new RegExp('^'+regex+'$'),ids,spanish,fixed});
}
patterns.sort((a,b)=>b.fixed-a.fixed);
export function getLanguage() {return typeof document!=='undefined'&&document.documentElement.lang==='es'?'es':'en';}
export function readLanguage(storage,query='') {
  const requested=new URLSearchParams(query).get('lang');
  if(['en','es'].includes(requested)) return requested;
  try {return storage?.getItem(languageKey)==='es'?'es':'en';} catch {return 'en';}
}
export function saveLanguage(storage,language) {
  if(!['en','es'].includes(language)) return false;
  try {storage?.setItem(languageKey,language);return Boolean(storage);} catch {return false;}
}
const cache=new Map();
export function translate(value,language=getLanguage(),depth=0) {
  const original=String(value);
  if(language!=='es'||!original.trim()) return original;
  const source=clean(original);
  let result=cache.get(source)??exact.get(source);
  if(result===undefined&&depth<5) {
    const end=source.search(/(?<=[.!?])\s+/u);
    if(end>0) {
      const first=source.slice(0,end),known=exact.get(first);
      if(known!==undefined) result=known+' '+translate(source.slice(end).trim(),'es',depth+1);
    }
  }
  if(result===undefined&&depth<5) {
    for(const pattern of patterns) {
      const match=pattern.regex.exec(source);if(!match)continue;
      if(pattern.fixed<=8&&match.slice(1).some(part=>part.length>40||/[.!?]/.test(part)))continue;
      const parts=Object.fromEntries(pattern.ids.map((id,i)=>[id,translate(match[i+1],'es',depth+1)]));
      result=pattern.spanish.replace(/\{(\d+)\}/g,(all,id)=>parts[id]??all);break;
    }
  }
  if(result===undefined&&depth<5) {
    const sentences=source.split(/(?<=[.!?])(?<!\d\.)\s+(?=[A-Z])/u);
    if(sentences.length>1) {
      const translated=[];
      for(let i=0;i<sentences.length;) {
        let end=i+1;
        for(let j=sentences.length;j>i+1;j--) if(exact.has(sentences.slice(i,j).join(' '))){end=j;break;}
        translated.push(translate(sentences.slice(i,end).join(' '),'es',depth+1));i=end;
      }
      const joined=translated.join(' ');if(joined!==source)result=joined;
    } else if(source.endsWith('.')) {
      const base=source.slice(0,-1),translated=translate(base,'es',depth+1);
      if(translated!==base)result=translated+'.';
    }
  }
  if(result===undefined&&depth<5) {
    const prefix=source.match(/^([✓↳▶←→]\s+)(.+)$/u);
    if(prefix) {const tail=translate(prefix[2],'es',depth+1);if(tail!==prefix[2])result=prefix[1]+tail;}
    else if(source.includes(' · ')) {
      const pieces=source.split(' · '),translated=pieces.map(piece=>translate(piece,'es',depth+1));
      if(translated.some((piece,i)=>piece!==pieces[i]))result=translated.join(' · ');
    } else if(/[:↗→]$/.test(source)) {
      const tail=source.match(/\s*[:↗→]$/)[0],body=source.slice(0,-tail.length),translated=translate(body,'es',depth+1);
      if(translated!==body)result=translated+tail;
    }
  }
  if(result===undefined) return original;
  if(cache.size>5000)cache.clear();cache.set(source,result);
  return original.match(/^\s*/)[0]+result+original.match(/\s*$/)[0];
}
export const translateLines=(value,language=getLanguage())=>String(value).split('\n').map(line=>translate(line,language)).join('\n');
