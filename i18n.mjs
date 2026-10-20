import {translate,readLanguage,saveLanguage,getLanguage,languages,isLanguage,languageKey,languageDirection,formatBidi} from './locale.mjs?v=24';
// Display-only localization: IDs, field values and all learning / case state
// remain unchanged. Keep each source node so switching back restores English.
const textSources=new WeakMap(),attributeSources=new WeakMap();
const ignored='script,style,code,textarea,[data-no-i18n],[data-i18n-managed]';
const attributes=['aria-label','aria-valuetext','title','alt','placeholder'];
let storage;try{storage=window.localStorage;}catch{/* Language works without storage. */}
let language=readLanguage(storage,location.search);
document.documentElement.lang=language;
document.documentElement.dir=languageDirection(language);
const titleSource=document.title;
function localizeText(node) {
  if(!node.parentElement||node.parentElement.closest(ignored))return;
  const previous=textSources.get(node),current=node.nodeValue;
  const source=previous&&current===previous.output?previous.source:current;
  const output=formatBidi(translate(source,language),language);
  textSources.set(node,{source,output});if(output!==current)node.nodeValue=output;
}
function localizeAttributes(element) {
  if(element.closest(ignored))return;
  const records=attributeSources.get(element)??{};
  for(const attribute of attributes) if(element.hasAttribute(attribute)) {
    const current=element.getAttribute(attribute),previous=records[attribute];
    const source=previous&&current===previous.output?previous.source:current;
    const output=translate(source,language);records[attribute]={source,output};
    if(output!==current)element.setAttribute(attribute,output);
  }
  attributeSources.set(element,records);
}
export function localize(root=document.body) {
  if(root.nodeType===Node.TEXT_NODE){localizeText(root);return;}
  if(root.nodeType!==Node.ELEMENT_NODE||root.closest(ignored))return;
  localizeAttributes(root);
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT);
  while(walker.nextNode()) {
    const node=walker.currentNode;
    if(node.nodeType===Node.TEXT_NODE)localizeText(node);else localizeAttributes(node);
  }
}
const observer=new MutationObserver(records=>{
  const added=new Set();
  for(const record of records) {
    if(record.type==='characterData')localizeText(record.target);
    else if(record.type==='attributes')localizeAttributes(record.target);
    else for(const node of record.addedNodes)added.add(node);
  }
  for(const node of added)if(node.isConnected)localize(node);
});
observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:attributes});
const selector=document.createElement('label');selector.className='language-picker';selector.dataset.noI18n='';
selector.innerHTML=`<span aria-hidden="true">◎</span><select aria-label="Language / Idioma / Langue / اللغة">${Object.entries(languages).map(([code,label])=>`<option value="${code}" lang="${code}">${label}</option>`).join('')}</select>`;
const select=selector.querySelector('select');select.value=language;
document.querySelector('header')?.append(selector);
function switchLanguage(next,persist=true) {
  if(!isLanguage(next))return;
  language=next;document.documentElement.lang=next;document.documentElement.dir=languageDirection(next);select.value=next;
  if(persist)saveLanguage(storage,next);
  document.title=translate(titleSource,next);
  localize();
  document.dispatchEvent(new CustomEvent('fiber:language',{detail:{language:next}}));
}
select.addEventListener('change',()=>{
  const url=new URL(location.href);
  if(url.searchParams.has('lang')){url.searchParams.delete('lang');history.replaceState(null,'',url);}
  switchLanguage(select.value);
});
window.addEventListener('storage',event=>{if(event.key===languageKey)switchLanguage(isLanguage(event.newValue)?event.newValue:'en',false);});
switchLanguage(language,new URLSearchParams(location.search).has('lang'));
export {getLanguage};
