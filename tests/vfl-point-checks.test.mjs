import test from 'node:test';
import assert from 'node:assert/strict';
import {createCase,changeCase,traceStop,traceKey,caseHistory,assessment,nextCheckActions,vflProgress} from '../troubleshoot-state.mjs';

const apply=(s,...actions)=>actions.reduce(changeCase,s);
const observe=(s,strand,result)=>apply(s,{type:'strand',value:strand},{type:'ready',value:true},{type:'record',result});

test('point checks record at each chosen CAS without plug-state steps in either direction',()=>{
  for(const [from,near,far,side] of [[0,1,2,'rear'],[3,2,1,'front']]) {
    let s=apply(createCase(),{type:'trace',from,to:near},
      {type:'patch',point:near,side,connected:false,port:25},
      {type:'patch',point:far,side:'front',connected:true},
      {type:'patch',point:far,side:'rear',connected:true},
      {type:'vfl-point-checks'});
    assert.equal(traceStop(s).kind,'port');
    assert.equal(traceStop(s).port,25);
    assert.equal(traceStop(s).closed,false);
    assert.deepEqual(s.traces,{},'selecting a check must not invent a result');
    s=observe(s,'tx','seen');
    const first=traceKey(s);
    s=changeCase(s,{type:'trace',from,to:far});
    assert.equal(traceStop(s).point,far);
    assert.equal(traceStop(s).blocked,false);
    assert.equal(traceStop(s).closed,false);
    s=observe(s,'rx','dark');
    assert.equal(s.traces[first],'seen');
    assert.equal(s.traces[traceKey(s)],'dark');
    s=changeCase(s,{type:'trace',from,to:near});
    assert.equal(traceStop(s).port,25);
    assert.equal(s.traces[first],'seen');
  }
});

test('point-check findings isolate the failed strand without requesting a loose-head record',()=>{
  let s=apply(createCase(),{type:'vfl-point-checks'},{type:'trace',from:0,to:1});
  s=observe(observe(s,'tx','seen'),'rx','seen');
  s=changeCase(s,{type:'trace',from:0,to:2});
  s=observe(observe(s,'tx','seen'),'rx','dark');
  const finding=assessment(s);
  assert.deepEqual([finding.from,finding.to],[1,2]);
  assert.equal(finding.isolation.strand,'rx');
  assert.equal(finding.needsIdentity,true);
  assert.equal(finding.sourceEvidence.to,1);
  assert.equal(finding.check?.head??false,false);
  assert.equal(vflProgress(s).points[1].lanes.rx.segment,'suspect');
  s=observe(s,'rx','weak');
  assert.equal(assessment(s).check.head,false);
  s=apply(s,...nextCheckActions(s));
  assert.equal(traceStop(s).kind,'port');
  assert.equal(traceStop(s).closed,false);
});

test('old loose-head observations stay in history without becoming CAS passes',()=>{
  let s=apply(createCase(),{type:'trace',from:0,to:1},{type:'patch',point:1,side:'rear',connected:false});
  s=observe(s,'tx','seen');
  assert.equal(s.traces['1:tx:head'],'seen');
  s=changeCase(s,{type:'vfl-point-checks'});
  assert.deepEqual(s.traces,{});
  assert.equal(caseHistory(s)[0].key,'1:tx:head');
  assert.equal(caseHistory(s)[0].result,'seen');
  assert.equal(caseHistory(s)[0].current,false);
  assert.equal(vflProgress(s).points[0].lanes.tx.result,undefined);
  s=observe(s,'tx','dark');
  assert.equal(s.traces['1:tx'],'dark');
  assert.equal(caseHistory(s).filter(e=>e.current).length,1);
});
