// Shared educational hardware drawings. Port numbering follows the site's layout;
// the enlarged light path illustrates one pair, not a connector pin map.
import { lightFlow, lightSource } from './light-visuals.mjs?v=1';
import {lcConnector} from './test-tool-visuals.mjs?v=1';
const text = (x,y,value,style='') => `<text x="${x}" y="${y}" class="hardware-label ${style}">${value}</text>`;

export function cassetteFront({port = 12, inserted = false, patched = false, name = 'CAS 1'} = {}) {
  let drawing = text(10,17,`${name} · front view`)+text(350,17,'32 ports','hardware-end hardware-small')+
    '<rect class="cassette-ear" x="2" y="57" width="356" height="86" rx="4"/>'+
    '<rect class="cassette-case" x="10" y="29" width="340" height="149" rx="6"/>'+
    '<path class="cassette-seam" d="M17 35 H343 M17 171 H343"/>'+
    '<circle class="cassette-screw" cx="6" cy="68" r="2"/><circle class="cassette-screw" cx="354" cy="68" r="2"/>';
  for (let number = 1; number <= 32; number++) {
    const x = 31.5 + ((number-1)%16)*19.8;
    const y = number <= 16 ? 59 : 137;
    const selected = number === port;
    drawing += `<g class="cassette-port${selected ? ' cassette-selected' : ''}" data-port="${number}">`+
      `<rect class="cassette-port-focus" x="${x-9}" y="${y-21}" width="18" height="52" rx="3"/>`+
      text(x,y-7,number,'cassette-number')+
      `<rect class="cassette-adapter" x="${x-7}" y="${y}" width="14" height="25" rx="2"/>`+
      `<path class="cassette-opening" d="M${x-4} ${y+5} h8 v14 h-8z"/>`+
      `<path class="cassette-key" d="M${x-2} ${y+3} h4"/>`;
    if (selected && inserted) drawing +=
      `<g transform="translate(${x-24*.32} ${y+4+83*.32}) rotate(-90) scale(.32)">${mmcLoopback(0,0,{compact:true})}</g>`;
    if (selected && patched) drawing +=
      `<path class="loop-jacket" d="M${x} ${y+28} V${y+59}"/><path class="loop-cord" d="M${x} ${y+28} V${y+59}"/>`+
      `<g transform="translate(${x-24*.24} ${y+4+83*.24}) rotate(-90) scale(.24)">${mmcHead(0,0,false)}</g>`;
    drawing += '</g>';
  }
  return `<g class="hardware-art">${drawing}</g>`;
}

function cable(path) {
  return `<path class="loop-jacket" d="${path}"/><path class="loop-cord" d="${path}"/>`;
}
function signal(out,back) {
  return `<path class="hardware-tx" d="${out}"/><path class="hardware-rx" d="${back}"/>`;
}
function lcPlug(x,y) {
  return lcConnector(x+40,y+14,{scale:.89,seated:true});
}

// Original schematic based on US Conec's MMC product photo: green housing,
// black push-pull boot and recessed ferrule. No fiber count or pin map implied.
// Keep the cable entry (-20,24) and mating tip (83,24) stable for existing scenes.
export function mmcHead(x,y,label = true) {
  return `<g class="mmc-connector" transform="translate(${x} ${y})" stroke-linejoin="round">
    <path d="M-21 15 Q-24 24 -21 33 L-15 30 H26 V18 H-15 Z" fill="#303637" stroke="#172526" stroke-width="1.2"/>
    <path d="M-17 24 H28" fill="none" stroke="#edd244" stroke-width="5"/>
    ${[-12,-5,2,9,16].map(x=>`<path d="M${x} 17 v14" stroke="#1c2527" stroke-width="3.5"/><path d="M${x-1} 18 v4" stroke="#606969" stroke-width="1"/>`).join('')}
    <path d="M23 15 H38 L44 11 H52 V38 H25 Q21 38 21 34 V19 Z" fill="#30383a" stroke="#172526" stroke-width="1.2"/>
    <path d="M40 15 H76 L79 18 V36 H44 L40 33 Z" fill="#26b565" stroke="#10613c" stroke-width="1.2"/>
    <path d="M43 17 H75 M44 18 V31" fill="none" stroke="#81e3a1" stroke-width="1.2"/>
    <path d="M44 34 H76 V36 H44 Z" fill="#158449"/>
    <path d="M79 19 H83 V33 H79 Z" fill="#bac4bd" stroke="#425650" stroke-width="1"/>
    <path d="M82 20 V32" stroke="#5f7068" stroke-width="1.3"/>
    <path d="M26 15 L34 7 H43 L48 11 H74 V15 H48 L43 12 H36 L32 16 Z" fill="#282f32" stroke="#172526" stroke-width="1.2"/>
    <path d="M34 9 H42 L47 13 H71" fill="none" stroke="#5f696b" stroke-width="1"/>
    <path d="M27 32 H37 M47 31 H55 L59 27 H74 V32" fill="none" stroke="#167847" stroke-width=".8"/>
    ${label ? '<text x="60" y="25" text-anchor="middle" fill="#dbf6e4" font-family="Segoe UI,sans-serif" font-size="7" font-weight="700">MMC</text>' : ''}</g>`;
}

// One connector, one boot, and a jacketed fiber return loop, as in Sylex's
// published MMC loopback photo. The compact drawing shortens the lead to fit
// a cassette overview; neither view specifies internal fiber pairing.
export function mmcLoopback(x=0,y=0,{compact=false,label=false}={}) {
  const loop=compact?'M-48 24 C-96 24 -96 -16 -61 -16 C-28 -16 -25 24 -48 24':'M-64 24 C-137 24 -137 -30 -82 -30 C-30 -30 -26 24 -64 24';
  const junction=compact?-48:-64;
  return `<g class="mmc-loopback" transform="translate(${x} ${y})" stroke-linecap="round" stroke-linejoin="round">
    <path d="${loop} M${junction} 24 H-20" fill="none" stroke="#a78a16" stroke-width="7"/>
    <path d="${loop} M${junction} 24 H-20" fill="none" stroke="#f3d53f" stroke-width="4.8"/>
    <path d="${loop}" fill="none" stroke="#fff29a" stroke-width="1" transform="translate(0 -1.2)"/>
    <rect x="${junction-7}" y="19.5" width="14" height="9" rx="2.5" fill="#343b3d" stroke="#1e292b" stroke-width=".8"/>
    <path d="M${junction-4} 21 H${junction+4}" stroke="#6c7474" stroke-width="1"/>
    ${mmcHead(0,0,label)}</g>`;
}

export function mmcLoopbackConnection(name='CAS 1',port=12) {
  return `<g class="hardware-art">
    ${text(14,19,`${name} · Port ${port}`,'hardware-small')}
    <rect class="hardware-metal" x="24" y="35" width="49" height="78" rx="4"/>
    <circle class="cassette-screw" cx="32" cy="43" r="2"/><circle class="cassette-screw" cx="32" cy="105" r="2"/>
    <path d="M58 48 H88 L94 55 V96 L88 102 H58 Z" fill="#4d9272" stroke="#225e43" stroke-width="1.5"/>
    <path d="M85 57 H98 V91 H85 Z" fill="#1d392d" stroke="#98cdb3"/>
    <g transform="translate(175 50) scale(-1 1)">${mmcLoopback()}</g>
    ${text(228,123,'MMC loopback','hardware-center hardware-small')}
  </g>`;
}

export function patchRouteIllustration() {
  const out = 'M65 278 H148 Q250 278 250 217 V75';
  const back = 'M258 75 V225 Q258 318 148 318 H65';
  return {height:376, hardware:true,
    caption:'Example: LC follower → MMC head → CAS 1 Port 12. Light continues through the passive; this is a patch, not a loopback. Use your actual FIM destination.',
    drawing:`${cassetteFront()}<g class="hardware-art">
      ${text(12,199,'Example · CAS 1 Port 12','hardware-small')}
      ${text(12,219,'CAS passes TX onward → remote RX','hardware-small')}
      <path class="optic-pull" d="M9 277 V254 H74 V277 H67 V261 H16 V277 Z"/>
      <rect class="hardware-metal" x="13" y="266" width="58" height="64" rx="4"/>
      <rect class="optic-opening" x="48" y="271" width="18" height="15" rx="2"/>
      <rect class="optic-opening" x="48" y="310" width="18" height="15" rx="2"/>
      ${text(39,301,'Optic 5','hardware-small hardware-center')}
      ${cable(out)}${cable(back)}
      <g transform="translate(95 264) scale(-.75 1)">${lcPlug(0,0)}${lcPlug(0,40)}</g>
      <rect class="hardware-plug" x="246" y="63" width="16" height="29" rx="2"/>
      <path class="hardware-grip" d="M249 72 H259 M249 78 H259 M249 84 H259"/>
      <rect class="hardware-boot" x="248" y="92" width="12" height="12" rx="2"/>
      ${signal(out,back)}
      ${lightFlow(out)}${lightFlow(back,'return-ir')}${lightSource(65,278)}
      <path class="hardware-tx-arrow" d="M142 274 l7 4 -7 4"/><path class="hardware-rx-arrow" d="M149 314 l-7 4 7 4"/>
      ${text(128,263,'TX starts here →','hardware-small hardware-center')}${text(128,340,'RX ← from remote','hardware-small hardware-center')}
      ${text(278,111,'MMC head','hardware-small')}
      ${text(39,356,'Local optic','hardware-small hardware-center')}${text(168,368,'LC follower','hardware-small hardware-center')}
    </g>`};
}

export function mmcPatchingIllustration(step) {
  const seated = step === 2;
  const headX = seated ? 199 : 100;
  const captions = [
    'Match the head serial and FIM destination. CAS 1 Port 12 is only the destination used in this illustration.',
    'Inspect, clean if needed, then inspect again. Align the head with the adapter rails; do not force it.',
    'Head seated in Port 12. Confirm the latch, support the cable and check optic health. Select Seat again to replay.'
  ];
  return {height:400, hardware:true, caption:captions[step],
    drawing:`${cassetteFront({patched:seated})}<g class="hardware-art">
      ${text(180,199,'Example destination · CAS 1 Port 12','hardware-center hardware-small')}
      <rect class="hardware-detail" x="3" y="215" width="354" height="179" rx="6"/>
      ${text(15,237,'Port 12 · enlarged side view','hardware-small')}
      <rect class="hardware-metal" x="285" y="255" width="46" height="86" rx="3"/>
      <rect class="cassette-adapter" x="268" y="265" width="30" height="66" rx="2"/>
      <path class="cassette-opening" d="M268 276 H281 V320 H268 Z"/>
      <path class="cassette-key" d="M270 279 H291 M270 317 H291"/>
      ${text(300,357,'Port 12','hardware-small hardware-center')}
      ${step === 1 ? '<path class="mmc-alignment" d="M173 285 H268 M173 311 H268"/>' : ''}
      <svg x="12" y="248" width="275" height="92" viewBox="12 248 275 92">
        <g class="${seated ? 'mmc-seating' : ''}">
          ${cable(`M-90 298 H${headX-18}`)}${mmcHead(headX,274)}
        </g>
      </svg>
      ${!seated ? '<path class="patch-insert" d="M199 298 H246 m-7 -5 7 5 -7 5"/>' : '<path class="mmc-seated-check" d="M233 254 l5 5 10 -12"/>'}
      ${text(140,356,seated ? 'Seated + latched' : step === 1 ? 'Align the rails' : 'Match the head','hardware-small hardware-center')}
      ${text(180,383,'Head serial · S747885346FWL','hardware-small hardware-center')}
    </g>`};
}

export function loopIllustration(kind = 'direct') {
  if (kind === 'direct') {
    const out = 'M200 102 H75 Q45 102 45 128';
    const back = 'M45 128 Q45 154 75 154 H200';
    const lightPath = `${out} Q45 154 75 154 H200`;
    return {height:236, label:'LC loopback inserted into one duplex pair on the local optic. Purple tab above the ports. TX light travels through the loop and returns to RX.',
      caption:'LC loopback inserted · tests the local optic.', lightPath,
      drawing:`<g class="hardware-art">${text(180,18,'Local optic · front view','hardware-center')}
        <path class="optic-pull" d="M156 81 V38 Q156 30 164 30 H304 Q312 30 312 38 V81 H302 V46 H166 V81 Z"/>
        <rect class="hardware-metal" x="163" y="63" width="142" height="120" rx="4"/>
        <path class="cassette-seam" d="M168 69 H300 M233 79 V176"/>
        ${[200,267].map((x,i) => `<rect class="optic-recess" x="${x-23}" y="80" width="46" height="89" rx="3"/>`+
          [102,154].map(y => `<rect class="optic-opening" x="${x-15}" y="${y-14}" width="30" height="28" rx="2"/><circle class="optic-ferrule" cx="${x}" cy="${y}" r="7"/><circle class="optic-core" cx="${x}" cy="${y}" r="3"/>`).join('')+
          text(x,199,i ? 'Position 2' : 'Position 1','hardware-center hardware-tiny')).join('')}
        ${cable(lightPath)}${lcPlug(160,88)}${lcPlug(160,140)}
        ${signal(out,back)}
        ${lightSource(200,102)}
        <path class="hardware-tx-arrow" d="M105 98 l-7 4 7 4"/><path class="hardware-rx-arrow" d="M98 150 l7 4 -7 4"/>
        ${text(124,83,'TX starts here','hardware-small hardware-center')}${text(130,183,'RX receives','hardware-small hardware-center')}
        ${text(56,208,'LC loopback','hardware-small')}${text(180,230,'Two LC plugs · one return loop','hardware-small hardware-center')}
      </g>`};
  }

  const out = 'M65 278 H100 Q112 278 120 290 L137 296 H322 C351 296 351 258 330 258';
  const back = 'M330 258 C310 258 308 300 322 300 H137 L120 306 Q112 318 100 318 H65';
  const lightPath = `${out} C310 258 308 300 322 300 H137 L120 306 Q112 318 100 318 H65`;
  return {height:382, label:'CAS 1 cassette with ports 1 through 16 on the top row and 17 through 32 on the bottom row. An MMC loopback is inserted at port 12. The enlarged side view shows the optic and fiber feeding the opposite side of that adapter; light turns around inside the loopback.',
    caption:'MMC loopback inserted · tests the optic and fiber to this port. One pair shown.', lightPath,
    drawing:`${cassetteFront({inserted:true})}<g class="hardware-art">
      ${text(180,198,'Port 12 · MMC loopback inserted','hardware-center')}
      <rect class="hardware-detail" x="3" y="217" width="354" height="159" rx="6"/>
      ${text(14,237,'Port 12 · enlarged side view','hardware-small')}
      <path class="optic-pull" d="M9 277 V254 H74 V277 H67 V261 H16 V277 Z"/>
      <rect class="hardware-metal" x="13" y="266" width="58" height="64" rx="4"/>
      <rect class="optic-opening" x="48" y="271" width="18" height="15" rx="2"/><rect class="optic-opening" x="48" y="310" width="18" height="15" rx="2"/>
      ${text(39,301,'Optic','hardware-small hardware-center')}
      ${cable('M65 278 H100 Q112 278 120 290 L137 298 M65 318 H100 Q112 318 120 306 L137 298')}
      <g transform="translate(95 264) scale(-.75 1)">${lcPlug(0,0)}${lcPlug(0,40)}</g>
      ${mmcHead(137,274)}
      <rect class="cassette-adapter" x="220" y="276" width="23" height="43" rx="2"/>
      <path class="cassette-seam" d="M228 279 V316 M236 279 V316"/>
      <g transform="translate(293 274) scale(-.6 1)">${mmcLoopback(0,0,{compact:true})}</g>
      ${signal(out,back)}
      ${lightSource(65,278)}
      <path class="hardware-tx-arrow" d="M99 274 l7 4 -7 4"/><path class="hardware-rx-arrow" d="M106 314 l-7 4 7 4"/>
      ${text(130,265,'TX starts here →','hardware-small hardware-center')}${text(130,340,'RX ← loop return','hardware-small hardware-center')}
      ${text(130,365,'LC + fiber','hardware-small hardware-center')}${text(200,353,'Head','hardware-small hardware-center')}
      ${text(231,367,'Adapter','hardware-tiny hardware-center')}${text(309,353,'Loopback','hardware-small hardware-center')}
    </g>`};
}
