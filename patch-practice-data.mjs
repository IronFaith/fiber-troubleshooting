// Fictional FIM tickets using the user's site-specific 1 / 5 optic mapping.
export const patchTasks = [
  {id:'lc-left', kind:'lc', optic:25, ethernet:1, flipped:false, leg:3, title:'Ethernet 25/1 · upright'},
  {id:'lc-right', kind:'lc', optic:25, ethernet:5, flipped:false, leg:8, title:'Ethernet 25/5 · upright'},
  {id:'lc-flipped', kind:'lc', optic:7, ethernet:1, flipped:true, leg:5, title:'Ethernet 7/1 · upside down'},
  {id:'mmc-top', kind:'mmc', cas:1, port:12, title:'CAS 1 · Port 12'},
  {id:'mmc-bottom', kind:'mmc', cas:2, port:28, title:'CAS 2 · Port 28'}
];
export const headSerial = 'S747885346FWL';

export function targetSlot(task) {
  if(task.kind==='mmc') return String(task.port);
  return (task.ethernet===5) !== task.flipped ? 'right' : 'left';
}

export function placementCorrect(task,connector,slot) {
  return connector===task.kind && slot===targetSlot(task);
}

export function placementExplanation(task) {
  if(task.kind==='lc') return `${task.optic}/${task.ethernet} means optic ${task.optic}, position ${task.ethernet===1 ? 1 : 2}. With the tab ${task.flipped ? 'below' : 'above'}, that is the ${targetSlot(task)} side.`;
  return `This head goes to CAS ${task.cas}, Port ${task.port}. ${task.port<=16 ? 'Top row: 1–16.' : 'Bottom row: 17–32.'} The head serial identifies the fanout; the FIM ticket gives its destination.`;
}

export function recordPatchAnswer(answers,id,connector,slot) {
  const task=patchTasks.find(item=>item.id===id);
  if(!task || Object.hasOwn(answers,id) || !['lc','mmc'].includes(connector)) return answers;
  const valid=task.kind==='lc' ? ['left','right'].includes(slot) : Array.from({length:32},(_,i)=>String(i+1)).includes(slot);
  if(!valid) return answers;
  return {...answers,[id]:{connector,slot}};
}

export function patchResult(answers) {
  const answered=patchTasks.filter(task=>Object.hasOwn(answers,task.id));
  const missed=answered.filter(task=>!placementCorrect(task,answers[task.id].connector,answers[task.id].slot));
  const correct=answered.length-missed.length;
  return {answered:answered.length,correct,missed,complete:answered.length===patchTasks.length,passed:answered.length===patchTasks.length && correct>=4};
}

const storageKey='fiber-patching-best-v1';
export function loadPatchBest(storage) {
  try {
    const raw=storage.getItem(storageKey);
    const best=raw===null ? null : JSON.parse(raw);
    return {best:Number.isInteger(best) && best>=0 && best<=5 ? best : null,canSave:true};
  } catch { return {best:null,canSave:false}; }
}
export function savePatchBest(storage,score) {
  if(!Number.isInteger(score) || score<0 || score>5) return {best:loadPatchBest(storage).best,canSave:false};
  const best=Math.max(score,loadPatchBest(storage).best ?? 0);
  try { storage.setItem(storageKey,JSON.stringify(best)); return {best,canSave:true}; }
  catch { return {best,canSave:false}; }
}
