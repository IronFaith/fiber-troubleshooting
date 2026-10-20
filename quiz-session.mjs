import {questions, startAttempt, recordAnswer, validRoundIds} from './quiz-data.mjs?v=17';

export const sessionKey = 'fiber-exam-session-v1';
const validChoices = (id,value) => {
  const question=questions.find(item=>item.id===id);
  return Array.isArray(value) && Array.isArray(question?.correct) && value.every(choice=>Number.isInteger(choice)&&choice>=0&&choice<question.choices.length);
};
function cleanAnswers(ids, answers) {
  let attempt=startAttempt(ids);
  for(const id of ids) if(Object.hasOwn(answers||{},id)) attempt=recordAnswer(attempt,id,answers[id]);
  return attempt.answers;
}
export function restoreExam(raw) {
  if(!raw || raw.version!==1 || !validRoundIds(raw.round,raw.ids) || !Number.isInteger(raw.index) || typeof raw.retry!=='boolean') return null;
  const ids=raw.attempt?.ids;
  if(!Array.isArray(ids) || !ids.length || new Set(ids).size!==ids.length || ids.some(id=>!raw.ids.includes(id))) return null;
  if(!raw.retry && JSON.stringify(ids)!==JSON.stringify(raw.ids)) return null;
  if(raw.index<0 || raw.index>=ids.length) return null;
  const answers=cleanAnswers(ids,raw.attempt.answers);
  if(ids.some((id,i)=>i<raw.index&&!Object.hasOwn(answers,id) || i>raw.index&&Object.hasOwn(answers,id))) return null;
  const roundAnswers=cleanAnswers(raw.ids,raw.roundAnswers);
  if(raw.retry && raw.ids.some(id=>!Object.hasOwn(roundAnswers,id))) return null;
  Object.assign(roundAnswers,answers);
  const event=raw.countEvent;
  const countEvent=event?.kind==='exam' && /^[0-9a-f-]{36}$/i.test(event.id) && Number.isSafeInteger(event.at) ? {id:event.id,kind:'exam',at:event.at} : null;
  return {round:raw.round,ids:[...raw.ids],attempt:{ids:[...ids],answers},index:raw.index,retry:raw.retry,roundAnswers,
    firstScore:Number.isInteger(raw.firstScore)&&raw.firstScore>=0&&raw.firstScore<=5?raw.firstScore:0,
    draftChoices:validChoices(ids[raw.index],raw.draftChoices)?[...new Set(raw.draftChoices)]:[],countEvent};
}
export function loadExam(storage) {
  try { return restoreExam(JSON.parse(storage.getItem(sessionKey))); } catch { return null; }
}
export function saveExam(storage, state) {
  try { storage.setItem(sessionKey,JSON.stringify({version:1,...state})); return true; } catch { return false; }
}
export function clearExam(storage) {
  try { storage.removeItem(sessionKey); } catch { /* Optional. */ }
}
