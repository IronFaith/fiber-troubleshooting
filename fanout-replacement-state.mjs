// Local training state only. No live MyPatch operations or exam storage.
export function newFanoutReplacement() {
  return {leaderCleared:false,followers:Array(12).fill(true),newLeaderPatched:false};
}

export function canPatchFanout(state) {
  return state.leaderCleared && state.followers.every(patched=>!patched) && !state.newLeaderPatched;
}

export function changeFanoutReplacement(state,action) {
  if(action.type==='clearLeader' && !state.newLeaderPatched) return {...state,leaderCleared:true};
  if(action.type==='clearFollower' && state.leaderCleared && !state.newLeaderPatched && Number.isInteger(action.leg) && action.leg>=1 && action.leg<=state.followers.length)
    return {...state,followers:state.followers.map((patched,index)=>index===action.leg-1?false:patched)};
  if(action.type==='patchNew' && canPatchFanout(state)) return {...state,newLeaderPatched:true};
  return state;
}
