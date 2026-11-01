// Local checklist only; no equipment or record-management operations.
export function newFanoutReplacement() {
  return {headVerified:false,legsVerified:Array(12).fill(false),completed:false};
}

export function canCompleteFanout(state) {
  return state.headVerified && state.legsVerified.every(Boolean) && !state.completed;
}

export function changeFanoutReplacement(state,action) {
  if(state.completed) return state;
  if(action.type==='verifyHead') return {...state,headVerified:true};
  if(action.type==='verifyLeg' && Number.isInteger(action.leg) && action.leg>=1 && action.leg<=state.legsVerified.length)
    return {...state,legsVerified:state.legsVerified.map((verified,index)=>index===action.leg-1?true:verified)};
  if(action.type==='complete' && canCompleteFanout(state)) return {...state,completed:true};
  return state;
}
