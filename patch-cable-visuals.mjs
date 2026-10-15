// A visible jacket and connector, not light or a measured optical result.
const svgNS='http://www.w3.org/2000/svg';
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
const mix=(from,to,amount)=>from+(to-from)*amount;

export function patchCableVisual(host) {
  let state=null, frame=0, observer=null;

  function workspace() { return host.querySelector('.lab-workbench'); }
  function source() { return host.querySelector(`[data-connector="${state.kind}"]`); }
  function layer() { return host.querySelector('.lab-cable-layer'); }
  function localPoint(clientX,clientY) {
    const bounds=workspace().getBoundingClientRect();
    return {x:clientX-bounds.left,y:clientY-bounds.top};
  }
  function origins() {
    const svg=source().querySelector('svg'), matrix=svg.getScreenCTM();
    const positions=state.kind==='lc' ? [[43,33],[43,59]] : [[35,48]];
    return positions.map(([x,y])=> {
      const point=new DOMPoint(x,y).matrixTransform(matrix);
      return localPoint(point.x,point.y);
    });
  }
  function parked() {
    const points=origins();
    return {x:points[0].x+36,y:(points[0].y+points.at(-1).y)/2,w:34,h:22,gap:31,side:-1};
  }
  function destination(slot) {
    const target=host.querySelector(`[data-drop="${slot}"]`);
    if(!target) return parked();
    const bounds=target.getBoundingClientRect();
    const point=localPoint(bounds.left+bounds.width/2,bounds.top+bounds.height/2);
    if(state.kind==='lc') return {...point,w:bounds.width*46/74,h:bounds.height*40/112,gap:bounds.height*58/112,side:slot==='right' ? 1 : -1};
    return {...point,y:point.y+bounds.height*11/52,w:bounds.width*10/19.8,h:bounds.height*24/52,gap:0,side:0};
  }
  function geometry() {
    if(state.mode==='seated') return destination(state.slot);
    return state.point;
  }
  function plug(geo) {
    const {x,y,w,h,gap,side}=geo;
    if(state.kind==='mmc') {
      return `<g class="lab-moving-mmc" transform="translate(${x} ${y})">
        <rect class="lab-plug-nose" x="${-w*.42}" y="${-h*.65}" width="${w*.84}" height="${h*.24}" rx="2"/>
        <rect class="lab-plug-body" x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="3"/>
        <path class="lab-plug-latch" d="M${-w*.25} ${-h*.46} h${w*.5} v${h*.32} h${-w*.5}z"/>
        <path class="lab-plug-grip" d="M${-w*.3} 0 h${w*.6} m${-w*.6} 6 h${w*.6} m${-w*.6} 6 h${w*.6}"/>
        <rect class="lab-plug-boot" x="${-w*.36}" y="${h*.46}" width="${w*.72}" height="${h*.36}" rx="3"/>
      </g>`;
    }
    return `<g class="lab-moving-lc" transform="translate(${x} ${y})">${[-1,1].map(row=> {
      const cy=row*gap/2;
      return `<rect class="lab-plug-boot" x="${side<0 ? -w*.83 : w*.42}" y="${cy-h*.21}" width="${w*.41}" height="${h*.42}" rx="3"/>
        <rect class="lab-plug-body" x="${-w/2}" y="${cy-h/2}" width="${w}" height="${h}" rx="3"/>
        <path class="lab-plug-latch" d="M${side*w*.35} ${cy-h*.35} v${h*.7} h${side*w*.18} v${-h*.7}z"/>
        <path class="lab-plug-grip" d="M${-w*.28} ${cy-h*.28} h${w*.56} M${-w*.28} ${cy-h*.08} h${w*.56}"/>`;
    }).join('')}</g>`;
  }
  function draw() {
    if(!state || !workspace() || !source()) return;
    const canvas=layer(), geo=geometry(), points=origins();
    const bounds=workspace().getBoundingClientRect();
    const ends=state.kind==='lc'
      ? [-1,1].map(row=>({x:geo.x+geo.side*geo.w*.82,y:geo.y+row*geo.gap/2}))
      : [{x:geo.x,y:geo.y+geo.h*.81}];
    const paths=points.map((start,i)=> {
      const end=ends[i];
      const slack=clamp(Math.hypot(end.x-start.x,end.y-start.y)*.35,40,115);
      const bendX=clamp(end.x+(geo.side || -1)*slack,12,bounds.width-12);
      const bendY=Math.min(bounds.height-12,Math.max(start.y,end.y)+slack);
      const turnY=start.y+(end.y-start.y)*.5;
      const path=state.kind==='lc'
        ? `M${start.x} ${start.y} C${start.x+18} ${start.y+slack} ${bendX} ${start.y+slack} ${bendX} ${turnY} C${bendX} ${bendY} ${bendX} ${end.y} ${end.x} ${end.y}`
        : `M${start.x} ${start.y} C${start.x+18} ${start.y+slack} ${bendX} ${bendY} ${end.x} ${end.y}`;
      return `<path class="lab-cable-shadow" d="${path}"/><path class="lab-cable-jacket" d="${path}"/><path class="lab-cable-shine" d="${path}"/>`;
    }).join('');
    canvas.dataset.state=state.mode;
    canvas.dataset.connector=state.kind;
    canvas.innerHTML=`<g class="lab-flex-cable lab-flex-${state.kind}">${paths}${plug(geo)}</g>`;
  }
  function clear() {
    cancelAnimationFrame(frame); frame=0; state=null;
    host.querySelectorAll('.lab-cable-in-use').forEach(item=>item.classList.remove('lab-cable-in-use'));
    const canvas=layer();
    if(canvas) { canvas.replaceChildren(); delete canvas.dataset.state; delete canvas.dataset.connector; }
  }
  function init(kind) {
    clear(); state={kind,mode:'held'};
    source().classList.add('lab-cable-in-use');
    state.point=parked();
  }
  function travel(destinationPoint,done) {
    cancelAnimationFrame(frame);
    const from={...geometry()};
    // Direct dragging always follows the hand. Only automatic travel is optional.
    const duration=host.closest('.light-paused') ? 0 : 380;
    const started=performance.now();
    state.mode='moving';
    function tick(now) {
      if(!state) return;
      const to=destinationPoint(), fraction=duration ? Math.min(1,(now-started)/duration) : 1;
      const eased=1-Math.pow(1-fraction,3);
      state.point=Object.fromEntries(['x','y','w','h','gap','side'].map(key=>[key,mix(from[key],to[key],eased)]));
      draw();
      if(fraction<1) frame=requestAnimationFrame(tick);
      else { frame=0; done(); }
    }
    tick(started);
  }
  return {
    refresh:draw,
    reset() {
      clear(); observer?.disconnect();
      const bench=workspace();
      if(!bench) return;
      const canvas=document.createElementNS(svgNS,'svg');
      canvas.setAttribute('class','lab-cable-layer'); canvas.setAttribute('aria-hidden','true');
      bench.append(canvas);
      observer=new ResizeObserver(draw); observer.observe(bench);
    },
    clear,
    grab(kind,clientX,clientY) {
      init(kind); state.mode='dragging'; state.point={...state.point,...localPoint(clientX,clientY)}; draw();
    },
    move(clientX,clientY,side) {
      if(state?.mode!=='dragging') return;
      state.point={...state.point,...localPoint(clientX,clientY),side:side==='right' ? 1 : -1}; draw();
    },
    seat(kind,slot,done=()=>{}) {
      if(!state || state.kind!==kind) init(kind);
      state.slot=slot;
      travel(()=>destination(slot),()=> { state.mode='seated'; draw(); done(); });
    },
    returnToTray(done=()=>{}) {
      if(!state) { done(); return; }
      travel(parked,()=> { clear(); done(); });
    }
  };
}
