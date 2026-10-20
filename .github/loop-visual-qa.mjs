import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const server=spawn(process.execPath,['preview.mjs']);
await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject);});
await mkdir('loop-qa-output',{recursive:true});
const browser=await chromium.launch();
const report=[],failures=[];
const loop=(point,result='pass',side='local')=>[{type:'place',kind:point===0||point===3?'lc':'mmc',point},{type:'loop-side',value:side},{type:'ready',value:true},{type:'record',result}];
const scenarios=[
  {name:'reported-normalized-state',actions:[...loop(0),...loop(1),{type:'normalize'}],loops:[['local',1]]},
  {name:'loop-and-vfl',actions:[...loop(1),{type:'trace',from:0,to:1},{type:'strand',value:'tx'},{type:'ready',value:true},{type:'record',result:'seen'}],loops:[['local',1]]},
  {name:'mapped-port-28',actions:[{type:'port',point:1,value:28},...loop(1),{type:'normalize'}],loops:[['local',1]]},
  {name:'four-cas-pass',actions:[{type:'count',value:4},{type:'reach',value:5},{type:'place',kind:'mmc',point:4},{type:'ready',value:true},{type:'record',result:'pass'},{type:'normalize'}],loops:[['local',4]]},
  {name:'one-cas-remote',actions:[{type:'count',value:1},...loop(1,'pass','remote'),{type:'normalize'}],loops:[['remote',1]]},
  {name:'local-pass',actions:loop(1),loops:[['local',1]]},
  {name:'local-farther-pass',actions:[...loop(1),...loop(2)],loops:[['local',2]]},
  {name:'failed-onward',actions:[...loop(1),...loop(2,'dark')],loops:[['local',1]]},
  {name:'remote-pass',actions:loop(2,'pass','remote'),loops:[['remote',2]]},
  {name:'normalized-both-ends',actions:[...loop(1),...loop(2,'pass','remote'),{type:'normalize'}],loops:[['local',1],['remote',2]]},
  {name:'conflicting-loops',actions:[...loop(1,'dark'),...loop(2)],loops:[]},
  {name:'vfl-after-loop',actions:[...loop(1),{type:'place',kind:'vfl',point:0}],loops:[['local',1]]},
  {name:'normalized-direct',actions:[...loop(0),{type:'normalize'}],loops:[['local',0]]},
  {name:'unrecorded',actions:[{type:'place',kind:'mmc',point:1}],loops:[]},
  {name:'retest',actions:[...loop(1),{type:'retest'}],loops:[]},
  {name:'changed-port',actions:[...loop(1),{type:'port',point:1,value:28}],loops:[]},
];
try {
  for(const width of [1728,1400,390]) for(const scenario of scenarios) {
    const context=await browser.newContext({viewport:{width,height:900}}),page=await context.newPage(),errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto('http://127.0.0.1:4182/');
    await page.evaluate(async actions=>{
      const {createCase,changeCase}=await import('./troubleshoot-state.mjs?v=21');
      const actual=actions.reduce(changeCase,createCase());
      sessionStorage.setItem('fiber-workbench-v1',JSON.stringify({actual,simulation:createCase(true),view:'actual'}));
    },scenario.actions);
    await page.reload({waitUntil:'networkidle'});
    await page.waitForTimeout(100);
    const result=await page.evaluate(()=>({
      flows:[...document.querySelectorAll('.ts-hardware-flow .learn-signal')].map(path=>{const start=path.getPointAtLength(0),end=path.getPointAtLength(path.getTotalLength()),m=path.getScreenCTM(),a=new DOMPoint(start.x,start.y).matrixTransform(m),b=new DOMPoint(end.x,end.y).matrixTransform(m);return {strand:path.closest('[data-strand]').dataset.strand,kind:path.closest('.ts-hardware-vfl')?'vfl':'ir',a:[a.x,a.y],b:[b.x,b.y]};}),
      loops:[...document.querySelectorAll('.ts-hardware-loop')].map(group=>{
        const [out,back]=group.querySelectorAll('.learn-signal');
        const end=out.getPointAtLength(out.getTotalLength()),start=back.getPointAtLength(0);
        const svg=group.ownerSVGElement,bounds=svg.viewBox.baseVal;
        const points=[out,back].flatMap(path=>Array.from({length:101},(_,i)=>path.getPointAtLength(path.getTotalLength()*i/100)));
        const rectangles=[...document.querySelectorAll('.ts-node .cassette-case')].map(el=>el.getBoundingClientRect());
        const overlapsHardware=points.some(p=>{const q=new DOMPoint(p.x,p.y).matrixTransform(out.getScreenCTM());return rectangles.some(r=>q.x>=r.left&&q.x<=r.right&&q.y>=r.top&&q.y<=r.bottom);});
        const onHardware=!!group.closest('.ts-node')||group.classList.contains('ts-hardware-loop');
        return {side:group.dataset.loopSide,point:Number(group.dataset.loopPoint),gap:Math.hypot(end.x-start.x,end.y-start.y),overlapsHardware,onHardware,
          finite:points.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)),
          withinBounds:points.every(p=>{const q=new DOMPoint(p.x,p.y).matrixTransform(out.getScreenCTM()),r=svg.getBoundingClientRect();return q.x>=r.left-1&&q.y>=r.top-1&&q.x<=r.right+1&&q.y<=r.bottom+1;})};
      }),
      duplicateDiagram:!!document.querySelector('.ts-recorded-routes,.ts-stacked-span,.ts-stacked-direct-loop'),
      captions:[...document.querySelectorAll('.ts-hardware-caption')].map(el=>({overflow:el.getBoundingClientRect().bottom>el.parentElement.getBoundingClientRect().bottom+1,text:el.textContent})),
      service:JSON.parse(sessionStorage.getItem('fiber-workbench-v1')).actual.service,
      horizontalOverflow:document.documentElement.scrollWidth>innerWidth,
    }));
    await page.locator('.ts-map').screenshot({path:`loop-qa-output/${scenario.name}-${width}.png`});
    report.push({width,scenario:scenario.name,...result,errors});
    try {
    assert.deepEqual(errors,[],`${scenario.name}: browser errors`);
    assert.deepEqual(result.loops.map(r=>[r.side,r.point]),scenario.loops,`${scenario.name} at ${width}`);
    assert.ok(result.loops.every(r=>r.gap<.01&&r.finite&&r.withinBounds&&r.onHardware&&!r.overlapsHardware),`${scenario.name}: disconnected or clipped route`);
    assert.equal(result.duplicateDiagram,false,'one hardware animation diagram');
    assert.equal(result.service,'unknown','a loop pass must not verify live service');
    if(scenario.name==='loop-and-vfl') assert.ok(await page.locator('.ts-hardware-vfl .learn-signal.red').count(),'VFL evidence must remain separate');
    if(width===390)assert.equal(result.horizontalOverflow,false);
    }catch(error){failures.push({scenario:scenario.name,width,error:error.message});}
    await context.close();
  }
  for(const language of ['en','es','fr','ar']) {
    const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),page=await context.newPage();
    await page.goto('http://127.0.0.1:4182/');
    await page.evaluate(async ({actions,language})=>{
      const {createCase,changeCase}=await import('./troubleshoot-state.mjs?v=21');
      sessionStorage.setItem('fiber-workbench-v1',JSON.stringify({actual:actions.reduce(changeCase,createCase()),simulation:createCase(true),view:'actual'}));
      localStorage.setItem('fiber-language-v1',language);
    },{actions:loop(1),language});
    await page.reload({waitUntil:'networkidle'});
    await page.waitForTimeout(100);
    assert.equal(await page.locator('.ts-hardware-loop').count(),1);
    const arrow=page.locator('.ts-hardware-loop .flow-arrow').first();
    assert.equal(await arrow.evaluate(el=>getComputedStyle(el).animationPlayState),'paused');
    await page.locator('[data-action="motion"]').click();
    assert.equal(await page.locator('.ts-hardware-loop .flow-arrow').first().evaluate(el=>getComputedStyle(el).animationPlayState),'running');
    const offsets=[];
    for(let i=0;i<2;i++) {offsets.push(await page.locator('.ts-hardware-loop .flow-arrow').first().evaluate(el=>getComputedStyle(el).offsetDistance));await page.waitForTimeout(150);}
    assert.notEqual(offsets[0],offsets[1],'the connected loop arrow must move');
    await page.locator('.ts-map').screenshot({path:`loop-qa-output/mobile-${language}.png`});
    report.push({language,reducedMotion:true,playRestoresMotion:true,offsets});
    await context.close();
  }
  console.log('Verified',report.length,'browser scenarios');
  assert.deepEqual(failures,[]);
} finally {
  await writeFile('loop-qa-output/report.json',JSON.stringify(report,null,2));
  await browser.close();server.kill();
}
