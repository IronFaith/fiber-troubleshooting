import test from 'node:test';
import assert from 'node:assert/strict';
import {communicationRoute,cablePath} from '../communication-route.mjs';

test('the route crosses six passives in physical order in either direction',()=> {
  const forward=communicationRoute(), reverse=communicationRoute(true);
  assert.deepEqual(forward.nodes.map(node=>node.id),['A','A1','A2','A3','B3','B2','B1','B']);
  assert.deepEqual(reverse.nodes.map(node=>node.id),forward.nodes.map(node=>node.id).reverse());
  for(const route of [forward,reverse]) {
    assert.equal(route.steps.length,9);
    assert.deepEqual(route.steps.slice(1,7).map(step=>step.kind),['rack','distribution','passage','passage','distribution','rack']);
    route.steps.slice(1).forEach((step,i)=>assert.deepEqual(step.points[0],route.steps[i].points.at(-1)));
    assert.deepEqual(route.steps[1].points[0],[route.from.x,route.from.tx]);
    assert.deepEqual(route.steps[7].points.at(-1),[route.to.x,route.to.rx]);
  }
  assert.notDeepEqual(forward.steps[1].points[0],reverse.steps[7].points.at(-1));
});

test('rounded cables preserve each connection endpoint, including a straight electrical segment',()=> {
  for(const route of [communicationRoute(),communicationRoute(true)]) {
    for(const {points} of route.steps) {
      const path=cablePath(points);
      assert.ok(path.startsWith(`M${points[0].join(' ')}`));
      assert.ok(path.endsWith(`L${points.at(-1).join(' ')}`));
      assert.ok(!path.includes('NaN'));
    }
  }
  assert.equal(cablePath([[2,4],[22,4]]),'M2 4 L22 4');
});
