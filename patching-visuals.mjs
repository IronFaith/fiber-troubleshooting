const text = (x,y,value,extra='') => `<text x="${x}" y="${y}" ${extra}>${value}</text>`;

export function opticIllustration({selected=null, flipped=false, optic=25, labels=true, id='practice'}={}) {
  const right = (selected === 1) !== flipped;
  const suffix = selected ? 5 : 1;
  const position = selected+1;
  const side = right ? 'right' : 'left';
  const center = selected ? 232 : 128;
  const outerEdgeX = selected ? center+23 : center-31;
  const screenCenter = flipped ? 360-center : center;
  let drawing = `<defs>
      <linearGradient id="${id}-metal-face" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#97989c"/><stop offset=".2" stop-color="#dedfe1"/><stop offset=".48" stop-color="#b6b7bb"/><stop offset=".75" stop-color="#e6e7e9"/><stop offset="1" stop-color="#999a9f"/></linearGradient>
      <linearGradient id="${id}-pull-purple" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#51417d"/><stop offset="1" stop-color="#8063bb"/></linearGradient>
    </defs>`+
    text(180,24,`Optic ${optic} · front view`,'class="patch-title" text-anchor="middle"')+
    `<g class="patch-assembly" transform="rotate(${flipped ? 180 : 0} 180 197)"><g transform="translate(0 394) scale(1 -1)">`+
    `<path class="patch-pull-tab" style="fill:url(#${id}-pull-purple)" d="M49 102 H70 V270 Q70 279 80 279 H280 Q290 279 290 270 V102 H311 V292 Q311 312 291 312 H69 Q49 312 49 292 Z"/>`+
    `<rect class="patch-module-face" style="fill:url(#${id}-metal-face)" x="62" y="82" width="236" height="153" rx="5"/>`+
    '<path class="patch-face-lip" d="M66 86 H294 V105 H66 Z"/>'+
    '<path class="patch-module-seam" d="M69 112 V226 H291 V112 M180 111 V227"/>';
  [128,232].forEach((x,index) => {
    const active = index === selected;
    const keyX = index ? x+23 : x-31;
    drawing += `<rect class="${active ? 'patch-socket-active' : 'patch-socket'}" x="${x-37}" y="111" width="74" height="112" rx="3"/>`+
      `<rect class="patch-opening" x="${x-23}" y="118" width="46" height="40" rx="2"/><rect class="patch-opening" x="${x-23}" y="176" width="46" height="40" rx="2"/>`+
      `<rect class="patch-keyway" x="${keyX}" y="138" width="8" height="58" rx="1"/>`+
      `<circle class="patch-ferrule" cx="${x}" cy="138" r="11"/><circle class="patch-ferrule" cx="${x}" cy="196" r="11"/>`+
      `<circle class="patch-ferrule-core" cx="${x}" cy="138" r="5"/><circle class="patch-ferrule-core" cx="${x}" cy="196" r="5"/>`;
  });
  if(selected !== null) drawing += `<g class="patch-lc"><rect x="${center-23}" y="118" width="46" height="40" rx="2"/><rect x="${center-23}" y="176" width="46" height="40" rx="2"/><rect class="patch-outer-edge" x="${outerEdgeX}" y="138" width="8" height="58" rx="1"/></g>`;
  drawing += '</g></g>';
  [128,232].forEach((x,index) => {
    const visibleX = flipped ? 360-x : x;
    drawing += (labels ? text(visibleX,flipped ? 59 : 140,`${optic}/${index ? 5 : 1}`,'class="patch-port-label" text-anchor="middle"') : '')+
      text(visibleX,flipped ? 258 : 338,`Position ${index+1}`,'class="small" text-anchor="middle"');
  });
  if(selected !== null) drawing += `<path class="patch-insert" d="M${screenCenter} ${flipped ? 65 : 146} V${flipped ? 78 : 156} m-5 -5 5 5 5 -5"/>`;
  return {height:354, caption:selected === null ? `Optic ${optic}. ${flipped ? 'Tab below: upside down.' : 'Tab above: upright.'} Choose one LC position.` : `${flipped ? 'Upside down · tab below' : 'Upright · tab above'}. Ethernet ${optic}/${suffix} → position ${position}, now on the ${side}. The outside connector edge faces ${side}.`, drawing};
}

