import test from 'node:test';
import assert from 'node:assert/strict';
import {createCase,changeCase,connectionAt,recordedContinuity,caseHistory} from '../troubleshoot-state.mjs';
import {workbenchDiagram} from '../troubleshoot-visuals.mjs';

test('Normalize removes local and remote LC/MMC loopbacks while preserving their results and coverage',()=>{
  for(const [point,kind,side] of [[0,'lc','local'],[1,'mmc','local'],[2,'mmc','remote'],[3,'lc','remote']]) {
    let s=createCase();
    for(const action of [{type:'place',kind,point},{type:'loop-side',value:side},{type:'ready',value:true},{type:'record',result:'pass'}])s=changeCase(s,action);
    const coverage=recordedContinuity(s),history=caseHistory(s);
    for(const stacked of [false,true])assert.ok(workbenchDiagram(s,'',{stacked}).includes(kind==='lc'?'class="lc-loopback':'class="mmc-loopback'), 'installed tool remains visible after Pass');
    s=changeCase(s,{type:'normalize'});
    assert.equal(connectionAt(s,point),'plugged');
    assert.deepEqual(recordedContinuity(s).points,coverage.points);
    assert.deepEqual(recordedContinuity(s).spans,coverage.spans);
    assert.deepEqual(caseHistory(s),history);
    for(const stacked of [false,true]) {
      const view=workbenchDiagram(s,'',{stacked});
      assert.equal((view.match(/class="(?:lc|mmc)-loopback/g)||[]).length,0,`${side} ${kind}: normalized hardware has no loopback`);
      assert.ok(view.includes(kind==='lc'?'LC legs plugged into optic':'MMC head plugged into CAS'));
      assert.ok(view.includes(side==='local'?'Local loop: Pass':'Remote loop: Pass'));
      if(kind==='mmc')assert.ok(view.includes('ts-hardware-flow'), 'recorded checked-path highlighting remains');
    }
  }
});
