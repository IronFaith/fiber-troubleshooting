import {cassetteFront, loopIllustration} from './loop-visuals.mjs?v=5';
import {opticIllustration} from './patching-visuals.mjs?v=1';
import {lightFlow} from './light-visuals.mjs?v=1';
import {connectedCaseVisual} from './connected-case.mjs?v=3';
import {caseVisual} from './exam-evidence.mjs?v=3';

const escape=value=>String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const text=(x,y,value,extra='')=>`<text x="${x}" y="${y}" ${extra}>${value}</text>`;
const svg=(drawing,height=220,label='Training illustration',width=360)=>`<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${escape(label)}">${drawing}</svg>`;
const cord=path=>`<path class="q-cord-edge" d="${path}"/><path class="q-cord" d="${path}"/>`;
const opticFace=id=>opticIllustration({labels:false,id}).drawing.replace(/<text\b[^>]*>[\s\S]*?<\/text>/g,'');
const optic=(x=0,y=0,width=90,id='quiz-optic')=>`<svg x="${x}" y="${y}" width="${width}" height="${width}" viewBox="0 0 360 354" aria-hidden="true">${opticFace(id)}</svg>`;
const cassette=(name,port=null)=>svg(cassetteFront({name,port}),190,`${name}, 32 ports in two rows`);

function target(question,index,contents,answered,choice,extra='') {
  const correct=index===question.correct;
  const state=answered ? correct ? ' Correct answer.' : choice===index ? ' Your answer; review this choice.' : '' : '';
  return `<button type="button" class="quiz-target${answered && correct ? ' target-correct' : answered && choice===index ? ' target-missed' : ''}" data-choice="${index}" aria-label="${escape(question.choices[index]+state)}" ${answered ? 'disabled' : ''} ${extra}>${contents}${answered && (correct || choice===index) ? `<span class="q-target-mark" aria-hidden="true">${correct ? '✓' : '×'}</span>` : ''}</button>`;
}

function connector(seated) {
  const x=seated ? 106 : 139;
  return svg(`<rect class="q-metal" x="20" y="31" width="90" height="64" rx="4"/><path class="q-purple" d="M17 38 V16 H113 V38 H105 V24 H25 V38Z"/>
    <rect class="q-opening" x="86" y="48" width="28" height="35" rx="2"/>
    ${cord(`M${x+72} 65 H322`)}<rect class="q-lc" x="${x}" y="45" width="70" height="40" rx="3"/>
    <path class="q-latch" d="M${x+8} 42 H${x+54} V49 H${x+8}Z"/>
    <path class="q-grip" d="M${x+48} 52 V77 M${x+56} 52 V77"/>
    <rect class="q-metal" x="${x-9}" y="52" width="10" height="27"/>
    ${text(29,120,'Adapter')}${text(230,120,'LC cable')}`,140,seated ? 'Connector A: its nose meets the adapter, with no visible gap.' : 'Connector B: a visible gap separates its nose from the adapter.');
}

function readings(kind,answered) {
  const badge=(label,value,alert=false)=>`<div class="quiz-reading${alert ? ' reading-alert' : ''}"><span>${label}</span><strong>${value}</strong><small>dBm</small></div>`;
  if(kind==='simple-dark') return `<div class="q-report-label">Cable Guy · training report</div><div class="quiz-reading-pair">${badge('RX','−40',true)}${badge('TX','−40',true)}</div>`;
  if(kind==='simple-rx-dark') return `<div class="q-report-label">Local optic · training report</div><div class="quiz-reading-pair">${badge('TX','+0.80')}${badge('RX','−40',true)}</div>`;
  if(kind==='light-returns') return `<div class="q-report-label">One connection cleaned and reseated</div><div class="quiz-reading-pair">${badge('Before · RX','−40',true)}${badge('After · RX','+0.25')}</div><p class="q-observation">Link status has not been checked yet.</p>`;
  const gauge=(label,value,min,max)=>{
    const location=(value+6)/12*100;
    return `<div class="q-gauge"><div class="q-gauge-value"><strong>${label}</strong><b>${value>0 ? '+' : '−'}${Math.abs(value).toFixed(2)} <small>dBm</small></b></div>
      <div class="q-gauge-track"><span class="q-gauge-range" style="left:${(min+6)/12*100}%;width:${(max-min)/12*100}%"></span><span class="q-gauge-pointer${answered ? value<min || value>max ? ' q-outside' : ' q-inside' : ''}" style="left:${location}%">▼</span></div>
      <div class="q-gauge-scale"><span>−6</span><span>0</span><span>+6 dBm</span></div><p>Allowed here: <strong>${min.toFixed(2)} to +${max.toFixed(2)}</strong></p></div>`;
  };
  return `<div class="q-report-label">Training limits only · use the installed optic’s limits on site</div>${gauge('TX',.8,-1,3)}${gauge('RX',kind==='weak' ? -4.2 : .25,-3,3)}`;
}

function trace(question,answered,choice) {
  const node=(art,title,status)=>`<div class="q-trace-node"><div class="q-trace-hardware">${art}</div><div><strong>${title}</strong><span>${status}</span></div></div>`;
  const section=(index,status)=>target(question,index,`<span class="q-trace-line" aria-hidden="true"><svg viewBox="0 0 40 60">${cord('M20 0 V60')}${answered && index===0 ? lightFlow('M20 0 V60') : ''}</svg></span><span><b>${['A · Optic → CAS 1','B · CAS 1 → CAS 2','C · Beyond CAS 2'][index]}</b><small>${status}</small></span>`,answered,choice);
  return `<div class="q-trace">${node(svg(opticFace('trace-optic'),354),'Local optic','Direct loop: pass')}
    ${section(0,answered ? 'Checked to CAS 1' : 'First section')}
    ${node(cassette('CAS 1',28),'CAS 1 · Port 28','Loop here: pass')}
    ${section(1,answered ? 'Suspect span + connections' : 'Fiber between passives')}
    ${node(cassette('CAS 2',28),'CAS 2 · Port 28','Loop here: fail')}
    ${section(2,'Not tested')}
    <div class="q-trace-remote">Remote device · other room / building · not tested</div></div>`;
}

function directions(question,answered,choice) {
  return `<p class="q-observation">Same link, two directions. You are at the local end.</p><div class="q-directions">${[0,1].map(i=>{
    const path=i===0 ? 'M104 78 H256' : 'M256 78 H104';
    return target(question,i,svg(`<rect class="q-rack" x="8" y="13" width="94" height="123" rx="4"/><rect class="q-rack" x="258" y="13" width="94" height="123" rx="4"/>
      ${optic(11,28,88,`direction-${i}-local`)}${optic(261,28,88,`direction-${i}-remote`)}
      <path class="q-ir" d="${path}"/><path class="q-ir" d="${i===0 ? 'M236 72 l10 6 -10 6' : 'M124 72 l-10 6 10 6'}"/>
      ${answered && i===1 ? lightFlow(path) : ''}
      ${text(180,55,answered ? i===0 ? 'A · Local TX' : 'B · Local RX' : i===0 ? 'A' : 'B','text-anchor="middle"')}
      ${text(55,158,'Local','text-anchor="middle"')}${text(305,158,'Remote','text-anchor="middle"')}`,175,question.choices[i]),answered,choice);
  }).join('')}</div><p class="q-observation">Blue illustrates invisible IR; arrows show direction.</p>`;
}

function vfl(kind,answered) {
  const active=kind!=='vfl-setup', wrong=kind==='wrong-port';
  const destination=wrong ? 282 : 202;
  const path=`M83 172 H134 Q${destination} 172 ${destination} 133 V83`;
  return svg(`<rect class="q-vfl" x="9" y="157" width="68" height="29" rx="12"/><rect class="q-metal" x="74" y="163" width="12" height="17"/>${text(41,177,'VFL','class="q-white" text-anchor="middle"')}
    <rect class="q-cas" x="154" y="27" width="187" height="90" rx="5"/>
    ${[202,282].map((x,i)=>`<rect class="q-adapter" x="${x-19}" y="55" width="38" height="47" rx="3"/><rect class="q-opening" x="${x-12}" y="63" width="24" height="31"/>${text(x,47,i===0 ? '12' : '13','class="q-white" text-anchor="middle"')}`).join('')}
    ${text(246,18,'CAS · enlarged ports','text-anchor="middle"')}
    ${active ? cord(path)+`<path class="q-vfl-light" d="${path}"/>${answered ? lightFlow(path,'red') : ''}<circle class="q-red-point" cx="${destination}" cy="80" r="8"/>` : cord('M88 172 H124 Q142 172 142 150 V135')+text(196,151,'Check both ends','text-anchor="middle"')}
    ${text(180,222,active ? `Expected: 12 · detected: ${wrong ? '13' : '12'}` : 'VFL + fiber section · setup to verify','text-anchor="middle"')}`,245,active ? `On an isolated fiber, VFL light is detected at Port ${wrong ? '13' : '12'}. The expected destination is Port 12.` : 'VFL tool and a fiber section to prepare for testing.');
}

function vflSetup(answered) {
  return `<p class="q-observation">Check the two ends of the section you plan to trace.</p>${svg(`
    <rect class="q-rack" x="8" y="36" width="65" height="61" rx="4"/><rect class="q-rack" x="287" y="36" width="65" height="61" rx="4"/>
    ${text(40,60,'Active','class="q-white" text-anchor="middle"')}${text(40,79,'gear','class="q-white" text-anchor="middle"')}
    ${text(319,60,'Active','class="q-white" text-anchor="middle"')}${text(319,79,'gear','class="q-white" text-anchor="middle"')}
    ${cord('M106 89 Q180 136 254 89')}<rect class="q-lc" x="93" y="78" width="18" height="20" rx="2"/><rect class="q-lc" x="249" y="78" width="18" height="20" rx="2"/>
    ${text(96,27,'End A','text-anchor="middle"')}${text(264,27,'End B','text-anchor="middle"')}
    ${text(84,73,answered ? '✓' : '?','text-anchor="middle"')}${text(277,73,answered ? '✓' : '?','text-anchor="middle"')}
    ${text(180,146,answered ? 'Both ends disconnected from active gear' : 'Confirm how BOTH ends are connected','text-anchor="middle"')}
    <rect class="q-vfl" x="28" y="175" width="68" height="29" rx="12"/><rect class="q-metal" x="93" y="181" width="12" height="17"/>
    ${text(61,195,'VFL','class="q-white" text-anchor="middle"')}${text(125,193,answered ? '✓ Matching adapter' : 'Check the adapter too')}
    ${text(180,233,answered ? 'Ready for the site-approved tracing procedure' : 'VFL stays disconnected while you verify','text-anchor="middle"')}`,250,answered ? 'Both ends of the fiber section are disconnected from active equipment. The VFL adapter matches.' : 'Two fiber ends and active equipment. Question marks mean their connection status must be confirmed; the VFL is not attached.')}`;
}

function bendChange(answered) {
  const states=[
    {title:'Before · tight bend',value:'−8.00',path:'M12 82 H70 L82 33 L94 82 H208 Q232 82 232 62 V58'},
    {title:'After · bend removed',value:'−4.00',path:'M12 82 H38 C70 82 65 30 98 30 S127 82 161 82 H208 Q232 82 232 62 V58'}
  ];
  return `<div class="q-bend-comparison">${states.map((state,i)=>`<figure class="q-bend-state${answered && i===1 ? ' q-bend-reviewed' : ''}">
    <figcaption>${state.title}</figcaption><div class="q-bend-row">
      ${svg(`<svg x="200" y="-6" width="90" height="88.5" viewBox="0 0 360 354" aria-hidden="true">${opticFace(`bend-${i}`)}</svg>
        ${cord(state.path)}${i===0 ? '<circle class="q-bend-focus" cx="82" cy="33" r="16"/>' : ''}
        <path class="q-ir" d="M155 76 H184 m-6 -4 6 4 -6 4"/>
        <rect class="q-lc" x="228" y="57" width="8" height="13" rx="1"/>
        ${text(47,112,'Fiber')}${text(244,112,'Optic · RX','text-anchor="middle"')}`,124,`${state.title}. Fiber leads into the receiving optic. RX reads ${state.value} dBm.`,300)}
      <div class="q-bend-reading"><span>RX</span><strong>${state.value}</strong><small>dBm</small></div>
    </div></figure>`).join('')}</div>
    <p class="q-bend-limit"><span>Allowed RX in this example</span><strong>−3.00 to +3.00 dBm</strong></p>
    ${answered ? '<p class="q-bend-result">−4.00 is below the −3.00 minimum. Keep checking.</p>' : ''}
    <p class="q-observation">Training readings and limits. RX measures the light arriving at the optic.</p>`;
}

export function quizVisual(question,{answered=false,choice=null}={}) {
  const kind=question.visual;
  let body='';
  if(kind==='connected-case') body=connectedCaseVisual(question.caseStep,{answered});
  else if(kind.startsWith('lldp-')) {
    const missing=kind==='lldp-missing', purpose=kind==='lldp-purpose';
    const device=kind==='lldp-device'?'Device C':'Device B';
    const port=kind==='lldp-port'?'7/5':'7/1';
    body=`<p class="q-report-label">${purpose?'LLDP · Link Layer Discovery Protocol':'Fresh Cable Guy report · local Device A / 25/1'}</p>
      <div class="q-lldp-route"><div><b>Device A</b><small>Local · 25/1</small></div><span aria-hidden="true">↔</span><div class="q-lldp-cas"><b>CAS → CAS</b><small>Passive fiber path</small></div><span aria-hidden="true">↔</span><div><b>${missing?'Unconfirmed':device}</b><small>${missing?'No neighbor reported':`Remote · ${port}`}</small></div></div>
      ${purpose?'<div class="q-lldp-message">“I’m Device B. My port is 7/1.”<small>Message received by Device A over this link</small></div>':`<div class="q-lldp-reports"><div><span>FIM expects</span><strong>Device B</strong><b>Port 7/1</b></div><div><span>LLDP reports</span><strong>${missing?'No neighbor':device}</strong><b>${missing?'Identity unconfirmed':`Port ${port}`}</b></div></div>`}
      ${kind==='lldp-device'?'<p class="q-test-results"><strong>TX / RX within example limits</strong><span>Expected endpoint still needs confirmation</span></p>':''}`;
  }
  else if(kind.startsWith('case-')) body=caseVisual(question,answered);
  else if(['simple-dark','simple-rx-dark','light-returns','healthy','weak'].includes(kind)) body=readings(kind,answered);
  else if(kind==='connections') body=`<p class="q-observation">Side views · tap a connection</p><div class="q-connection-choices">${[0,1].map(i=>target(question,i,`<strong>Connection ${i===0 ? 'A' : 'B'}</strong>${connector(i===0)}`,answered,choice)).join('')}</div>`;
  else if(kind==='seated-dark') body=`<div class="q-report-label">Connector after inspection and reseating</div>${connector(true)}<div class="quiz-reading reading-alert"><span>RX after reseating</span><strong>−40</strong><small>dBm</small></div>`;
  else if(kind==='dirty') body=svg(`<circle class="scope-face" cx="180" cy="104" r="80"/><circle class="scope-core" cx="180" cy="104" r="23"/><g class="q-contamination"><circle class="dirt" cx="171" cy="96" r="12"/><circle class="dirt" cx="199" cy="119" r="7"/><circle class="dirt" cx="142" cy="135" r="5"/></g>${answered ? '<circle class="q-inspection-ring" cx="180" cy="104" r="36"/>' : ''}${text(180,213,'Inspection image · isolated connector','text-anchor="middle"')}`,235,'Inspection view showing particles on the connector end face.');
  else if(kind==='bend-change') body=bendChange(answered);
  else if(kind==='bend') {
    body=svg(`<rect class="q-manager" x="126" y="54" width="108" height="88" rx="5"/>${cord('M18 101 H130 Q180 111 230 101 H342')}
      <path class="q-latch" d="M139 54 H221 V99 H210 V69 H150 V99 H139Z"/>
      ${text(180,26,'Cable-management clip','text-anchor="middle"')}<path class="q-data-line" d="M180 155 V119 m-5 7 5 -7 5 7"/>
      ${text(180,177,'Cable squeezed under the clip','text-anchor="middle"')}${text(180,204,'No tear visible in the outer covering','text-anchor="middle"')}`,225,'Fiber cable squeezed under a management clip. Its outer covering has no visible tear.');
  } else if(kind==='cassette') {
    body=`<p class="q-fim-ticket"><span>Mock FIM destination</span><strong>CAS 2 / Port 28</strong></p><p class="q-observation">Top: 1–16 · Bottom: 17–32. Scroll to see every port.</p><div class="q-cas-scroll" tabindex="0" role="group" aria-label="CAS 2 cassette, scroll horizontally for all 32 ports"><div class="q-cas-board">${svg(cassetteFront({name:'CAS 2',port:answered ? 28 : null,patched:answered}),206)}${question.choices.map((_,i)=>target(question,i,'',answered,choice,`style="left:${(21.6+(i%16)*19.8)/360*100}%;top:${(i<16 ? 38 : 116)/206*100}%;width:5.5%;height:${52/206*100}%"`)).join('')}</div></div>`;
  } else if(kind==='recheck') body=`<div class="q-action-sequence"><span>Connector reseated</span><b aria-hidden="true">→</b><span class="${answered ? 'q-confirmed' : ''}">${answered ? 'Recheck + record' : 'Next observation?'}</span></div>${answered ? svg(`<path class="q-ir" d="M30 35 H330"/>${lightFlow('M30 35 H330')}`,70,'Observe the result after the change.') : '<p class="q-observation">No new health reading has been taken.</p>'}`;
  else if(kind==='optic') body=svg(`<rect class="q-rack" x="8" y="52" width="82" height="100" rx="4"/>${text(49,93,'Device','class="q-white" text-anchor="middle"')}${text(49,115,'data','class="q-white" text-anchor="middle"')}
    <path class="q-data-line" d="M90 103 H132"/>${optic(128,15,130,'purpose')}${cord('M258 101 H350')}${answered ? lightFlow('M258 101 H350') : ''}
    ${text(190,184,'Optic','text-anchor="middle"')}${text(311,140,'Fiber','text-anchor="middle"')}${text(180,222,answered ? 'Data → light    /    received light → data' : 'What happens inside this module?','text-anchor="middle"')}`,245,'A device connects through an optic module to a fiber.');
  else if(kind==='directions') body=directions(question,answered,choice);
  else if(kind==='lanes') body=`<div class="q-report-label">Cable Guy · four receive lanes</div><div class="q-lane-choices">${['+0.25','+0.28','−40','+0.21'].map((value,i)=>target(question,i,`<span>RX lane ${i+1}</span><strong>${value}</strong><small>dBm</small>`,answered,choice,`data-reading="${value}"`)).join('')}</div>`;
  else if(kind==='direct-loop') {
    const art=loopIllustration('direct');
    body=`<p class="q-test-results"><strong>Direct loop: pass</strong><span>Restored link: still failing</span></p>${svg(art.drawing,art.height,'Approved direct LC loopback at the local optic. The loop test passed.')}<p class="q-observation">The remote device is in another room.</p>`;
  } else if(kind==='sections') body=trace(question,answered,choice);
  else if(kind==='vfl-setup') body=vflSetup(answered);
  else body=vfl(kind,answered);
  return `<div class="quiz-evidence ${answered ? 'q-explained' : 'q-before'}">${body}${answered ? `<p class="q-visual-takeaway">${question.reveal}</p>` : ''}</div>`;
}

export function quizThumbnail(topic) {
  const drawings=[
    '<rect fill="#be2532" x="30" y="30" width="300" height="160" rx="10"/>'+text(180,95,'RX','class="q-white" text-anchor="middle"')+text(180,154,'−40','class="q-white q-thumb-number" text-anchor="middle"'),
    '<rect class="q-cas" x="28" y="25" width="304" height="170" rx="8"/>'+[92,180,268].map(x=>`<rect class="q-adapter" x="${x-25}" y="78" width="50" height="80" rx="4"/><rect class="q-opening" x="${x-15}" y="90" width="30" height="55"/>`).join('')+text(180,64,'CAS','class="q-white" text-anchor="middle"'),
    optic(55,0,250,'quiz-thumb'),
    cord('M40 110 H320')+'<rect class="q-cas" x="50" y="62" width="70" height="100" rx="5"/><rect class="q-cas" x="237" y="62" width="70" height="100" rx="5"/>'+text(85,123,'✓','class="q-white" text-anchor="middle"')+text(272,123,'?','class="q-white" text-anchor="middle"')
  ];
  return `<span class="q-quiz-thumb" aria-hidden="true">${svg(drawings[topic],250)}</span>`;
}

// Achievement artwork is decorative; nearby labels carry the earned state and title.
const emblemLine=d=>`<path d="${d}" fill="none" stroke="#102d43" stroke-width="7" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#efc45d" stroke-width="4" stroke-linecap="round"/>`;
const emblemOptic=(x,y,scale=1)=>`<g transform="translate(${x} ${y}) scale(${scale})"><path d="M7 15 V3 H33 V15" fill="none" stroke="#a58bdd" stroke-width="6" stroke-linejoin="round"/><rect y="12" width="40" height="34" rx="4" fill="#d8e2ec" stroke="#7e97ae" stroke-width="2"/><path d="M4 16 H36" stroke="#fff" stroke-width="2"/>${[6,23].map(px=>`<rect x="${px}" y="21" width="11" height="19" rx="2" fill="#193a53"/>${[26,35].map(py=>`<circle cx="${px+5.5}" cy="${py}" r="3" fill="#71d9ee" stroke="#e9faff"/>`).join('')}`).join('')}</g>`;
const emblemLc=(x,y,scale=1)=>`<g transform="translate(${x} ${y}) scale(${scale})"><path d="M9 7 V0 M23 7 V0" stroke="#e4edf3" stroke-width="6"/><path d="M3 9 H29 V29 L25 35 H7 L3 29 Z" fill="#7baed4" stroke="#c7e9ff" stroke-width="2"/><path d="M11 11 H21 V24 H11 Z" fill="#345c7c"/><path d="M12 33 V44 M21 33 V44" stroke="#efc45d" stroke-width="4" stroke-linecap="round"/><path d="M3 26 H29" stroke="#c7e9ff" stroke-width="2"/></g>`;
const emblemCas=(x,y,scale=1)=>`<g transform="translate(${x} ${y}) scale(${scale})"><rect width="44" height="24" rx="3" fill="#31775d" stroke="#9ed7b8" stroke-width="2"/>${[5,15,25,35].map(px=>[5,14].map(py=>`<rect x="${px}" y="${py}" width="5" height="5" rx="1" fill="#163e33" stroke="#a4d7bb"/>`).join('')).join('')}</g>`;
const emblemPulse=(x,y)=>`<path d="M${x-5} ${y} H${x+5} M${x+1} ${y-4} L${x+5} ${y} L${x+1} ${y+4}" fill="none" stroke="#80e7f4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
const fanoutEmblem=()=>`${emblemLine('M60 46 V56 M60 56 Q34 56 32 77 M60 56 Q49 60 50 80 M60 56 Q71 60 70 80 M60 56 Q86 56 88 77')}<rect x="47" y="26" width="26" height="23" rx="4" fill="#79b99c" stroke="#c3ead6" stroke-width="2"/><rect x="52" y="31" width="16" height="10" rx="2" fill="#174a3b"/>${[55,60,65].map(x=>`<circle cx="${x}" cy="36" r="1.6" fill="#94e6c0"/>`).join('')}${[27,45,65,83].map((x,i)=>emblemLc(x,i===0||i===3?77:80,.32)).join('')}`;
const linkEmblem=()=>`${emblemLine('M37 78 H27 Q19 78 19 70 V47 Q19 40 27 40 H93 Q101 40 101 47 V70 Q101 78 93 78 H83')}${emblemCas(27,28,.55)}${emblemCas(69,28,.55)}${emblemOptic(23,57,.72)}${emblemOptic(68,57,.72)}${emblemPulse(60,40)}<path d="M60 55 L63 62 L70 65 L63 68 L60 75 L57 68 L50 65 L57 62 Z" fill="#f5d88c"/>`;

function emblemFrame(level) {
  const shape=level===2?'<rect class="emblem-metal" x="8" y="8" width="104" height="104" rx="25"/>':level===3?'<path class="emblem-metal" d="M60 4 L108 32 V88 L60 116 L12 88 V32 Z"/>':level===4?'<path class="emblem-metal" d="M38 6 H82 L87 13 H98 L107 22 V33 L114 38 V82 L107 87 V98 L98 107 H87 L82 114 H38 L33 107 H22 L13 98 V87 L6 82 V38 L13 33 V22 L22 13 H33 Z"/>':'<circle class="emblem-metal" cx="60" cy="60" r="54"/>';
  return `${shape}<circle class="emblem-face" cx="60" cy="60" r="46"/><circle class="emblem-ring" cx="60" cy="60" r="42"/><path d="M28 26 A47 47 0 0 1 88 24" fill="none" stroke="#fff" stroke-opacity=".65" stroke-width="2" stroke-linecap="round"/>${level>1?[24,96].map(x=>[24,96].map(y=>`<circle cx="${x}" cy="${y}" r="2" fill="#fff" fill-opacity=".75"/>`).join('')).join(''):''}`;
}

export function rankEmblem(level) {
  const motifs=[
    '<circle cx="60" cy="56" r="23" fill="#bacbd8"/><circle cx="60" cy="56" r="17" fill="#eef5fa"/><circle cx="60" cy="56" r="10" fill="#65bbd6"/><circle cx="57" cy="53" r="4" fill="#fff"/><path d="M60 24 V18 M60 88 V94 M28 56 H22 M92 56 H98" stroke="#8caabd" stroke-width="2"/>',
    `${emblemLine('M56 75 V83 Q56 93 70 93 H79')}${emblemLc(44,30)}${emblemPulse(82,54)}`,
    `${emblemLine('M50 82 V89 Q50 95 43 95 M71 82 V89 Q71 95 78 95')}${emblemOptic(37,30,1.15)}${emblemPulse(60,23)}`,
    fanoutEmblem(),linkEmblem()
  ];
  return `<svg class="badge-art rank-emblem" data-tier="${level}" viewBox="0 0 120 120" aria-hidden="true" focusable="false">${emblemFrame(level)}${motifs[level]}${level?`<rect class="emblem-number-plate" x="43" y="98" width="34" height="17" rx="5"/><text class="emblem-number" x="60" y="110" text-anchor="middle">${['','I','II','III','IV'][level]}</text>`:''}</svg>`;
}

export function examEmblem(topic,earned) {
  const motifs={
    0:`${emblemLine('M27 73 H92')}<circle cx="54" cy="49" r="19" fill="#193f59" stroke="#d7eaf4" stroke-width="5"/><path d="M68 64 L83 81" stroke="#d7eaf4" stroke-width="7" stroke-linecap="round"/><path d="M42 49 H66" stroke="#80e7f4" stroke-width="4"/><circle cx="54" cy="49" r="4" fill="#fff"/>`,
    1:`${emblemLc(44,25)}<path d="M35 78 H85 M39 84 H81" stroke="#91c5dc" stroke-width="3"/><path d="m49 77 8 8 17-18" fill="none" stroke="#8fe3bd" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
    2:`${emblemOptic(40,28)}<path d="M30 82 H89 M35 91 H84" stroke="#efc45d" stroke-width="3"/>${emblemPulse(61,82)}<g transform="translate(120 182) rotate(180)">${emblemPulse(61,91)}</g>`,
    3:`${emblemLine('M42 76 H31 Q24 76 24 69 V38 Q24 28 36 28 H83 Q96 28 96 40 V69 Q96 76 87 76 H77')}${emblemOptic(40,47)}${emblemPulse(60,28)}`,
    patch:`${emblemLine('M45 76 V86 Q45 93 61 93 Q81 93 81 80 V59')}${emblemLc(29,28,.8)}${emblemCas(65,32,.65)}`,
    4:'<rect x="32" y="25" width="56" height="68" rx="6" fill="#e3edf5"/><path d="M43 40 H68 M43 51 H62 M43 62 H55" stroke="#5b7b95" stroke-width="4" stroke-linecap="round"/><circle cx="72" cy="70" r="16" fill="#286453" stroke="#9ce4bd" stroke-width="2"/><path d="m64 70 6 6 11-12" fill="none" stroke="#c8f7df" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>',
    5:linkEmblem()
  };
  const tier={0:1,1:2,2:2,3:3,patch:3,4:3,5:4}[topic];
  return `<svg class="badge-art exam-emblem${earned?'':' emblem-unearned'}" data-tier="${tier}" viewBox="0 0 120 120" aria-hidden="true" focusable="false">${emblemFrame(tier)}${motifs[topic]}${earned?'<circle cx="94" cy="94" r="13" fill="#246447" stroke="#fff" stroke-width="2"/><path d="m88 94 4 4 8-9" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>':''}</svg>`;
}
