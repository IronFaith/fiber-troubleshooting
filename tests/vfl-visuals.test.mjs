import test from 'node:test';
import assert from 'node:assert/strict';
import {createCase,changeCase,connectionAt} from '../troubleshoot-state.mjs';
import {vflEndpoint} from '../troubleshoot-visuals.mjs';

test('LC-to-CAS observation keeps the incoming MMC seated and lights the chosen port after a pass', () => {
  let s=changeCase(createCase(),{type:'trace',from:0,to:2});
  s=changeCase(s,{type:'port',value:32});
  assert.equal(connectionAt(s,1),'plugged');
  assert.deepEqual(vflEndpoint(s),{point:2,port:32,result:undefined,face:'front',kind:'port',blocked:false,closed:false,x:328.5,y:149,incomingSeated:true,emitting:false});
  s=changeCase(changeCase(s,{type:'ready',value:true}),{type:'record',result:'seen'});
  assert.equal(vflEndpoint(s).emitting,true);
  assert.equal(vflEndpoint(s).port,32);
});

test('unknown, dark and wrong-port results never show light at the expected cassette port', () => {
  let s=changeCase(createCase(),{type:'trace',from:0,to:1});
  assert.equal(vflEndpoint(s).emitting,false);
  s=changeCase(s,{type:'ready',value:true});
  for(const result of ['seen','dark','wrong','swapped']) {
    s=changeCase(s,{type:'record',result});
    assert.equal(vflEndpoint(s).emitting,['seen','swapped'].includes(result));
    assert.equal(vflEndpoint(s).incomingSeated,true);
  }
});

test('reverse traces use the other cassette face and Normalize removes the VFL indication', () => {
  let s=changeCase(createCase(),{type:'trace',from:2,to:1});
  assert.equal(vflEndpoint(s).face,'rear');
  s=changeCase(s,{type:'trace',from:2,to:0});
  assert.equal(vflEndpoint(s),null);
  s=changeCase(s,{type:'trace',from:0,to:1});
  s=changeCase(changeCase(s,{type:'ready',value:true}),{type:'record',result:'seen'});
  s=changeCase(s,{type:'normalize'});
  assert.equal(vflEndpoint(s),null);
  assert.equal(connectionAt(s,1),'plugged');
});
