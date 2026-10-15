// Shared educational hardware drawings. Port numbering follows the site's layout;
// the enlarged light path illustrates one pair, not a connector pin map.
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
      `<path class="loop-jacket" d="M${x-3} ${y+25} C${x-18} ${y+62} ${x+21} ${y+62} ${x+3} ${y+25}"/>`+
      `<path class="loop-cord" d="M${x-3} ${y+25} C${x-18} ${y+62} ${x+21} ${y+62} ${x+3} ${y+25}"/>`+
      `<rect class="hardware-plug" x="${x-5}" y="${y+4}" width="10" height="24" rx="2"/>`+
      `<path class="hardware-grip" d="M${x-3} ${y+14} h6 m-6 4 h6 m-6 4 h6"/>`+
      `<rect class="hardware-boot" x="${x-4}" y="${y+27}" width="8" height="8" rx="1"/>`;
    if (selected && patched) drawing +=
      `<path class="loop-jacket" d="M${x} ${y+26} V${y+59}"/><path class="loop-cord" d="M${x} ${y+26} V${y+59}"/>`+
      `<rect class="hardware-plug" x="${x-5}" y="${y+4}" width="10" height="24" rx="2"/>`+
      `<path class="hardware-grip" d="M${x-3} ${y+14} h6 m-6 4 h6 m-6 4 h6"/>`+
      `<rect class="hardware-boot" x="${x-4}" y="${y+27}" width="8" height="8" rx="1"/>`;
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
  return `<g transform="translate(${x} ${y})"><path class="hardware-plug" d="M0 4 H34 L40 8 V20 L34 24 H0 Z"/>`+
    '<rect class="hardware-boot" x="-17" y="8" width="18" height="12" rx="3"/>'+
    '<path class="hardware-latch" d="M6 3 H30 L34 7 H9 Z"/>'+
    '<path class="hardware-grip" d="M5 9 V19 M10 9 V19 M15 9 V19"/></g>';
}

// Side view: a keyed head, its latch, grip, ferrule nose and cable boot.
export function mmcHead(x,y,label = true) {
  return `<g transform="translate(${x} ${y})">
    <rect class="hardware-boot" x="-20" y="15" width="24" height="18" rx="4"/>
    <path class="hardware-plug" d="M0 4 H64 L73 10 V38 L64 44 H0 Z"/>
    <path class="hardware-metal" d="M73 12 H83 V36 H73 Z"/>
    <path class="hardware-latch" d="M28 0 H65 L72 7 H31 Z"/>
    <path class="hardware-grip" d="M7 10 V38 M13 10 V38 M19 10 V38"/>
    <path class="mmc-rail" d="M25 11 H67 M25 37 H67"/>
    ${label ? text(46,29,'MMC','hardware-tiny hardware-center') : ''}</g>`;
}

export function patchRouteIllustration() {
  const out = 'M65 278 H148 Q250 278 250 217 V75';
  const back = 'M258 75 V225 Q258 318 148 318 H65';
  return {height:376, hardware:true,
    caption:'Example: LC follower → MMC head → CAS 1 Port 12. Light continues through the passive; this is a patch, not a loopback. Use your actual FIM destination.',
    drawing:`${cassetteFront()}<g class="hardware-art">
      ${text(12,199,'Example · CAS 1 Port 12','hardware-small')}
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
      <path class="learn-signal ir" d="${out}"/><path class="learn-signal return-ir" d="${back}"/>
      <path class="hardware-tx-arrow" d="M142 274 l7 4 -7 4"/><path class="hardware-rx-arrow" d="M149 314 l-7 4 7 4"/>
      ${text(128,263,'TX out','hardware-small hardware-center')}${text(128,340,'RX back','hardware-small hardware-center')}
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
        <path class="hardware-tx-arrow" d="M105 98 l-7 4 7 4"/><path class="hardware-rx-arrow" d="M98 150 l7 4 -7 4"/>
        ${text(132,83,'TX out','hardware-small hardware-center')}${text(130,183,'RX back','hardware-small hardware-center')}
        ${text(56,208,'LC loopback','hardware-small')}${text(180,230,'Two LC plugs · one return loop','hardware-small hardware-center')}
      </g>`};
  }

  const out = 'M65 278 H292 Q330 278 330 298';
  const back = 'M330 298 Q330 318 292 318 H65';
  const lightPath = `${out} Q330 318 292 318 H65`;
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
      ${cable(lightPath)}
      <g transform="translate(95 264) scale(-.75 1)">${lcPlug(0,0)}${lcPlug(0,40)}</g>
      <path class="hardware-plug" d="M184 266 H211 L220 272 V324 L211 330 H184 Z"/>
      <path class="hardware-grip" d="M191 272 V324 M197 272 V324 M203 272 V324"/>
      <rect class="cassette-adapter" x="220" y="259" width="23" height="78" rx="2"/>
      <path class="cassette-seam" d="M228 262 V334 M236 262 V334"/>
      <path class="hardware-plug" d="M243 271 L249 266 H279 V330 H249 L243 325 Z"/>
      <path class="hardware-latch" d="M247 264 H271 V270 H247 Z"/>
      <path class="hardware-grip" d="M252 275 V321 M258 275 V321 M264 275 V321"/>
      <rect class="hardware-boot" x="279" y="271" width="14" height="14" rx="3"/><rect class="hardware-boot" x="279" y="311" width="14" height="14" rx="3"/>
      ${signal(out,back)}
      <path class="hardware-tx-arrow" d="M137 274 l7 4 -7 4"/><path class="hardware-rx-arrow" d="M144 314 l-7 4 7 4"/>
      ${text(130,265,'TX out','hardware-small hardware-center')}${text(130,340,'RX back','hardware-small hardware-center')}
      ${text(130,365,'LC + fiber','hardware-small hardware-center')}${text(200,353,'Head','hardware-small hardware-center')}
      ${text(231,367,'Adapter','hardware-tiny hardware-center')}${text(309,353,'Loopback','hardware-small hardware-center')}
    </g>`};
}
