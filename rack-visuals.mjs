import { mmcHead } from './loop-visuals.mjs?v=3';
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

function casPanel(rear) {
  let drawing = '<rect class="rack-cas" x="81" y="50" width="205" height="49" rx="2"/>'+
    label(91,61,'CAS 1','rack-on-dark rack-small')+label(280,61,'32 ports','rack-on-dark rack-small rack-end');
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

export function rackIllustration(side=0,elevation=30) {
  const rear = side === 1;
  const deviceY = levelY(elevation+1);
  const sourceY = deviceY+15;
  // The LC exits the selected optic, follows the side manager, then reaches CAS 1.
  const leg = `M140 ${sourceY} V${sourceY+13} Q140 ${sourceY+23} 127 ${sourceY+23} H80 Q67 ${sourceY+23} 67 ${sourceY+10} V133`;
  const cas = 'Q67 122 82 122 H204 Q223 122 223 104 V76';
  const fullPath = `${leg} ${cas}`;
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
  drawing += casPanel(rear);
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
