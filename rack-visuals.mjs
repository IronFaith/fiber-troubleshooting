import { mmcHead } from './loop-visuals.mjs?v=5';
import { lightFlow, lightSource } from './light-visuals.mjs?v=1';

// A teaching rack inspired by the reference photo, not a surveyed rack layout.
const label = (x,y,value,extra='') => `<text x="${x}" y="${y}" class="rack-label ${extra}">${value}</text>`;
const levelY = elevation => 50 + (42-elevation)*10;
const route = (path,hidden=false) => `<path class="rack-route-outline${hidden ? ' rack-hidden-route' : ''}" d="${path}"/><path class="rack-route${hidden ? ' rack-hidden-route' : ''}" d="${path}"/>`;

function device(elevation,selected=false) {
  const y = levelY(elevation+1);
  let drawing = `<g class="rack-device${selected ? ' rack-device-selected' : ''}" data-elevation="${elevation}">
    <rect class="rack-chassis" x="81" y="${y}" width="205" height="20" rx="2"/>
    <path class="rack-vent" d="M84 ${y+3} H283 M84 ${y+5} H283"/>`;
  for (let port=1; port<=16; port++) {
    const x = 88+(port-1)*12;
    drawing += `<g class="${selected && port===5 ? 'rack-selected-optic' : ''}">
      <rect class="rack-optic" x="${x}" y="${y+8}" width="9" height="10" rx="1"/>
      <path class="rack-tab" d="M${x} ${y+11} V${y+7} h9 v4"/>
      <rect class="rack-optic-port" x="${x+1.5}" y="${y+11}" width="2" height="5"/>
      <rect class="rack-optic-port" x="${x+5.5}" y="${y+11}" width="2" height="5"/>
    </g>`;
  }
  drawing += `<circle class="rack-led" cx="281" cy="${y+4}" r="1.5"/></g>`;
  return drawing;
}

function casPanel(rear,name='CAS 1') {
  let drawing = '<rect class="rack-cas" x="81" y="50" width="205" height="49" rx="2"/>'+
    label(91,61,name,'rack-on-dark rack-small')+label(280,61,'32 ports','rack-on-dark rack-small rack-end');
  for(let port=1; port<=32; port++) {
    const x = 92+((port-1)%16)*12;
    const y = port<=16 ? 70 : 86;
    drawing += `<g class="rack-cas-port${port===12 ? ' rack-cas-selected' : ''}" data-port="${port}">
      <rect x="${x-4}" y="${y-4}" width="8" height="9" rx="1"/>
      <path d="M${x-1.5} ${y-2} h3 v5 h-3z"/>
    </g>`;
  }
  drawing += label(282,116,rear ? 'Rear · 12' : 'MMC · 12','rack-on-dark rack-small rack-end');
  if(!rear) drawing += '<rect class="hardware-plug" x="219" y="69" width="8" height="17" rx="1"/><rect class="hardware-boot" x="220" y="85" width="6" height="6"/>';
  return drawing;
}

function casCutaway(rear) {
  const from = rear ? 335 : 25;
  const end = rear ? 25 : 335;
  const passage = `M${from} 632 H${end}`;
  return `<g class="hardware-art">
    <rect class="hardware-detail" x="4" y="548" width="352" height="151" rx="6"/>
    ${label(180,570,'CAS 1 · Port 12 · side cutaway','rack-center')}
    ${label(84,592,'Front','rack-small rack-center')}${label(276,592,'Behind','rack-small rack-center')}
    <rect class="rack-cutaway-body" x="165" y="599" width="30" height="65" rx="3"/>
    <rect class="cassette-adapter" x="163" y="609" width="34" height="46" rx="2"/>
    <g>${mmcHead(98,608,false)}</g>
    <g transform="translate(360 0) scale(-1 1)">${mmcHead(98,608,false)}</g>
    ${route(passage)}${lightFlow(passage)}
    ${label(rear ? 275 : 85,680,'From LC legs','rack-small rack-center')}
    ${label(rear ? 85 : 275,680,'Path continues','rack-small rack-center')}
    <path class="hardware-tx-arrow" d="${rear ? 'M218 627 l-8 5 8 5 M94 627 l-8 5 8 5' : 'M142 627 l8 5 -8 5 M266 627 l8 5 -8 5'}"/>
  </g>`;
}

function rackBody(rear,elevation,casName='CAS 1') {
  let drawing = '<g class="rack-art">'+label(180,18,'Example rack · front view','rack-center')+
    '<rect class="rack-shadow" x="51" y="29" width="273" height="467" rx="5"/>'+
    '<rect class="rack-frame" x="43" y="25" width="271" height="467" rx="4"/>'+
    '<rect class="rack-interior" x="58" y="48" width="239" height="424"/>'+
    '<path class="rack-rail" d="M55 49 V472 M302 49 V472"/>'+
    label(178,40,'Training rack · illustrative elevations','rack-on-dark rack-small rack-center');
  for(let level=1;level<=42;level++) {
    const y=levelY(level);
    drawing += `<path class="rack-tick" d="M47 ${y+5} h7 M302 ${y+5} h7"/>`;
    if(level%6===0 || level===1 || level===elevation) drawing += label(35,y+8,String(level),`rack-end rack-small${level===elevation ? ' rack-level-selected' : ''}`);
    if(level<38) drawing += `<path class="rack-blank" d="M81 ${y} H286"/>`;
  }
  // Muted background equipment and bundles suggest the photo without hiding the lesson.
  for(const position of [6,12,18,24,30]) drawing += device(position,position===elevation);
  for(const position of [6,12,18,24,30]) {
    if(position===elevation) continue;
    const y=levelY(position)+5;
    drawing += `<path class="rack-background-fiber" d="M94 ${y} Q94 ${y+14} 77 ${y+14} Q61 ${y+14} 61 ${y-7} V121 Q61 111 78 111 H116 V91"/>`;
  }
  return drawing+casPanel(rear,casName)+'</g>';
}

export function rackIllustration(side=0,elevation=30) {
  const rear = side === 1;
  const deviceY = levelY(elevation+1);
  const sourceY = deviceY+15;
  // The LC exits the selected optic, follows the side manager, then reaches CAS 1.
  const leg = `M140 ${sourceY} V${sourceY+13} Q140 ${sourceY+23} 127 ${sourceY+23} H80 Q67 ${sourceY+23} 67 ${sourceY+10} V133`;
  const cas = 'Q67 122 82 122 H204 Q223 122 223 104 V76';
  const fullPath = `${leg} ${cas}`;
  let drawing = '<g class="rack-art">'+rackBody(rear,elevation);
  drawing += route(leg)+route(`M67 133 ${cas}`,rear);
  for(const y of [142,202,262,322,382,442]) drawing += `<path class="rack-manager" d="M59 ${y} h17 v7 H59"/>`;
  const upArrowY = (sourceY+133)/2;
  drawing += lightFlow(fullPath)+lightSource(140,sourceY)+`<path class="rack-direction" d="M62 ${upArrowY+4} l5 -7 5 7 M218 108 l5 -7 5 7"/>`;
  drawing += `<rect class="rack-optic-focus" x="133" y="${deviceY+5}" width="15" height="16" rx="2"/>
    <rect class="rack-level-tag" x="4" y="${deviceY-1}" width="38" height="22" rx="3"/>`+
    label(23,deviceY+14,String(elevation),'rack-center rack-level-number')+
    label(279,deviceY+35,'Optic 5 · TX starts here','rack-on-dark rack-small rack-end')+
    '<rect class="rack-foot" x="48" y="492" width="31" height="7" rx="2"/><rect class="rack-foot" x="278" y="492" width="31" height="7" rx="2"/>'+
    label(180,521,`Optic 5 → LC leg → MMC → CAS 1 / 12`,'rack-center')+
    label(180,538,rear ? 'Dashed section runs behind the CAS.' : 'MMC head connects at the front.','rack-small rack-center')+
    casCutaway(rear)+'</g>';
  return {height:708,hardware:true,drawing,
    caption:`TX starts at optic 5, elevation ${elevation}: LC leg → MMC head → CAS 1 Port 12 (${rear ? 'rear' : 'front'}) → onward fiber. IR light is invisible; blue arrows illustrate its direction.`};
}

// One continuous TX-to-RX path, split only so a lesson can highlight each stage.
// Rear connections are shown schematically; this is not a surveyed cassette map.
export const rackJourneySegments = [
  'M140 245 V258 Q140 268 127 268 H100',
  'M100 268 H80 Q67 268 67 255 V203 Q67 192 82 192 H204 Q223 192 223 174 V152',
  'M223 152 V146 H231 V132',
  'M231 132 V64 Q231 38 257 38 H645 Q671 38 671 64 V132',
  'M671 132 V146 H663 V174 Q663 204 641 204 H522 Q507 204 507 226 V258 Q507 268 522 268 H565 Q580 268 580 248'
];

const rackReturnSegments = [
  'M580 245 V253 Q580 261 568 261 H540',
  'M540 261 H520 Q514 261 514 251 V225 Q514 211 529 211 H645 Q665 211 665 175 V152',
  'M665 152 V146 H673 V132',
  'M673 132 V76 Q673 52 651 52 H263 Q233 52 233 76 V132',
  'M233 132 V146 H225 V174 Q225 199 205 199 H88 Q74 199 74 213 V251 Q74 261 86 261 H124 Q140 261 140 248'
];

export function rackJourneyIllustration(reverse=false) {
  const fibers=reverse ? rackReturnSegments : rackJourneySegments;
  const otherFibers=reverse ? rackJourneySegments : rackReturnSegments;
  const sourceX=reverse ? 580 : 140, receiverX=reverse ? 140 : 580;
  const electrical=[`M${sourceX+130} 245 H${sourceX}`,`M${receiverX} 248 H${receiverX+130}`];
  const measures=fibers.map((path,i)=>i===0 ? `${electrical[0]} ${path}` : i===4 ? `${path} ${electrical[1]}` : path);
  let drawing=`<g class="rack-art journey-racks">
    <g transform="translate(0 70)">${rackBody(false,30,'CAS 1')}</g></g>
    <g class="rack-art journey-racks"><g transform="translate(440 70)">${rackBody(false,30,'CAS 2')}</g></g>
    <g class="rack-art">
    ${label(178,16,`DEVICE A · ${reverse ? 'receives' : 'sends'} data`,'rack-center journey-rack-title')}
    ${label(618,16,`DEVICE B · ${reverse ? 'sends' : 'receives'} data`,'rack-center journey-rack-title')}
    ${label(451,64,'Fiber between cassettes','rack-center')}`;
  drawing+=`<g class="journey-other-fiber">${otherFibers.map(path=>route(path)).join('')}</g>`;
  fibers.forEach((path,index)=> {
    drawing+=`<g data-journey-segment="${index}">${route(path)}<path class="journey-lit-path" d="${path}"/><path class="journey-stage-measure" d="${measures[index]}"/></g>`;
  });
  for(const offset of [0,440]) {
    const sending=reverse ? offset===440 : offset===0;
    drawing+=`<g transform="translate(${offset} 70)">
      <rect class="hardware-plug" x="219" y="69" width="8" height="17" rx="1"/>
      <rect class="hardware-boot" x="220" y="85" width="6" height="6" rx="1"/>
      <path class="rack-manager" d="M59 142 h17 v7 H59 M59 202 h17 v7 H59"/>
      <rect class="journey-device-outline" x="78" y="157" width="211" height="27" rx="3"/>
      <rect class="rack-optic-focus" x="133" y="165" width="15" height="16" rx="2"/>
      ${label(279,213,`Device ${offset ? 'B' : 'A'} · ${sending ? 'data → TX' : 'RX → data'}`,'rack-on-dark rack-small rack-end')}
      </g>`;
  }
  drawing+=`<path class="journey-electrical journey-electrical-send" d="${electrical[0]}"/>
    <path class="journey-electrical journey-electrical-receive" d="${electrical[1]}"/>
    <g data-journey-focus="0"><rect class="journey-hardware-halo" x="${reverse ? 518 : 78}" y="227" width="211" height="27" rx="3"/></g>
    <g data-journey-focus="1"><rect class="journey-hardware-halo" x="${reverse ? 500 : 56}" y="185" width="176" height="91" rx="12"/></g>
    <g data-journey-focus="2"><rect class="journey-hardware-halo" x="${reverse ? 654 : 208}" y="125" width="36" height="48" rx="7"/></g>
    <g data-journey-focus="3"><rect class="journey-hardware-halo" x="217" y="26" width="468" height="113" rx="16"/></g>
    <g data-journey-focus="4"><rect class="journey-hardware-halo" x="${reverse ? 78 : 518}" y="227" width="211" height="27" rx="3"/></g>
    ${lightSource(sourceX,245)}
    <circle class="journey-rx" cx="${receiverX}" cy="248" r="4"/>
    <path class="journey-measure" d="${measures.join(' ')}"/>
    <g class="journey-pulse" aria-hidden="true"><circle r="13"/><path d="M-9 -6 L5 0 L-9 6 L-5 0 Z"/></g>
    ${label(178,585,'Device A · elevation 30','rack-center')}${label(618,585,'Device B · elevation 30','rack-center')}
    </g>`;
  return {height:605,width:800,drawing};
}

// Compact rack faces keep both ends of one duplex pair visible together.
// Connector positions are enlarged for teaching, not a lane or rear-wiring map.
function linkRack(offset,name,local,casName='CAS 1') {
  let drawing = `<g class="link-rack${local ? ' link-rack-local' : ''}" data-device="${name}" transform="translate(${offset} 0)">
    <rect class="link-role-badge" x="10" y="4" width="152" height="28" rx="5"/>
    ${label(86,23,local ? 'LOCAL · YOU ARE HERE' : 'REMOTE','rack-center link-role')}
    ${label(86,53,`Device ${name}`,'rack-center link-device-name')}
    ${label(86,73,name==='A' ? 'Rack 17 · elevation 30' : 'Other rack · find in FIM','rack-center link-location')}
    <rect class="rack-shadow" x="14" y="186" width="152" height="264" rx="4"/>
    <rect class="rack-frame" x="10" y="182" width="152" height="264" rx="4"/>
    <rect class="rack-interior" x="18" y="212" width="136" height="221"/>
    <path class="rack-rail" d="M17 213 V432 M155 213 V432"/>
    ${label(68,195,casName,'rack-center rack-on-dark link-location')}
    ${label(68,209,'Port 12','rack-center rack-on-dark link-location')}
    <rect class="rack-cas" x="30" y="214" width="118" height="39" rx="2"/>`;
  for(let port=1;port<=32;port++) {
    const x=35+((port-1)%16)*7.4, y=port<=16 ? 224 : 240;
    drawing += `<g class="rack-cas-port${port===12 ? ' rack-cas-selected' : ''}" data-port="${port}">
      <rect x="${x-2.5}" y="${y}" width="5" height="9" rx=".5"/>
      <path d="M${x-1} ${y+2} h2 v5 h-2z"/></g>`;
  }
  for(const y of [402,424]) {
    drawing += `<rect class="rack-chassis" x="32" y="${y}" width="115" height="12" rx="1"/>
      <path class="rack-vent" d="M36 ${y+3} H140 M36 ${y+5} H140"/>`;
    for(let port=0;port<8;port++) drawing += `<rect class="rack-optic" x="${37+port*13}" y="${y+7}" width="8" height="4"/>`;
  }
  drawing += `<g class="rack-device-selected">
    <rect class="rack-chassis" x="32" y="311" width="115" height="65" rx="2"/>
    <circle class="rack-led" cx="139" cy="319" r="2"/>
    <rect class="hardware-metal" x="49" y="331" width="54" height="40" rx="3"/>
    <path class="optic-pull" d="M46 341 V322 H106 V341 H101 V328 H51 V341 Z"/>
    <path class="cassette-seam" d="M77 334 V368"/>
    <rect class="optic-opening" x="57" y="337" width="14" height="12" rx="1"/>
    <rect class="optic-opening" x="57" y="357" width="14" height="12" rx="1"/>
    <rect class="optic-opening" x="83" y="337" width="14" height="12" rx="1"/>
    <rect class="optic-opening" x="83" y="357" width="14" height="12" rx="1"/>
    ${label(111,347,'TX',name==='A' ? 'link-blue' : 'link-teal')}
    ${label(111,367,'RX',name==='A' ? 'link-teal' : 'link-blue')}
    </g>
    ${label(144,299,'LC leg','rack-end rack-on-dark link-location')}
    ${label(86,394,name==='A' ? 'Device A · elevation 30' : 'Device B · other end','rack-center rack-on-dark link-location')}
    <rect class="rack-foot" x="17" y="446" width="24" height="6" rx="2"/>
    <rect class="rack-foot" x="132" y="446" width="24" height="6" rx="2"/>
    </g>`;
  return drawing;
}

export function communicationRack(name,local) {
  return linkRack(0,name,local,`${name}1 · rack CAS`);
}

export function localRemoteIllustration(selected=0) {
  const atB = selected===1;
  // Each path begins at one optic's TX and ends at the other optic's RX.
  // Viewpoint changes labels only; it never reverses the actual light paths.
  const aToB = 'M64 343 H36 Q22 343 22 329 V284 Q22 270 36 270 H100 Q112 270 112 258 V126 Q112 110 128 110 H284 Q300 110 300 126 V258 Q300 280 288 280 H230 Q218 280 218 292 V349 Q218 363 232 363 H252';
  const bToA = 'M252 343 H224 Q210 343 210 329 V284 Q210 270 224 270 H296 Q308 270 308 258 V150 Q308 138 296 138 H132 Q120 138 120 150 V268 Q120 280 108 280 H42 Q30 280 30 292 V349 Q30 363 42 363 H64';
  let drawing = `<g class="rack-art link-racks">
    ${linkRack(0,'A',!atB)}${linkRack(188,'B',atB)}
    ${route(aToB)}${route(bToA)}`;
  for(const offset of [0,188]) {
    drawing += `<g transform="translate(${offset} 0)">
      <rect class="hardware-plug" x="108" y="226" width="16" height="31" rx="2"/>
      <path class="hardware-grip" d="M111 236 h10 M111 242 h10 M111 248 h10"/>
      <rect class="hardware-boot" x="110" y="257" width="12" height="7" rx="1"/>
      ${label(80,264,'MMC','rack-end rack-on-dark link-location')}
      <path class="rack-manager" d="M16 301 H35 V308 H16 M16 325 H35 V332 H16"/>
      </g>`;
  }
  drawing += `${lightFlow(aToB)}${lightFlow(bToA,'return-ir')}
    ${lightSource(64,343)}${lightSource(252,343,'return-ir')}
    <circle class="link-receiver link-blue" cx="252" cy="363" r="4"/>
    <circle class="link-receiver link-teal" cx="64" cy="363" r="4"/>
    <path class="link-direction link-blue" d="M179 105 l7 5 -7 5 M17 316 l5 -7 5 7 M213 315 l5 7 5 -7"/>
    <path class="link-direction link-teal" d="M187 133 l-7 5 7 5 M205 316 l5 -7 5 7 M25 315 l5 7 5 -7"/>
    ${label(210,98,'A sends → B receives','rack-center link-blue')}
    ${label(210,162,'A receives ← B sends','rack-center link-teal')}
    ${label(180,478,'Optic → LC leg → MMC / CAS → other end','rack-center')}
    </g>`;
  return {height:488,hardware:true,drawing,
    caption:`${atB ? 'B is local; A is remote.' : 'A is local; B is remote.'} Each optic makes its own TX light. Follow it to the other optic’s RX. The CAS passes that light onward.`};
}
