import {lightFlow,lightSource} from './light-visuals.mjs?v=1';
import {vflPen} from './test-tool-visuals.mjs?v=1';

// A/B name this teaching pair, not MMC pin positions or Ethernet ports.
export function polarityExample({swapped=false,strand='a'}={}) {
  const mapping=swapped?{a:'b',b:'a'}:{a:'a',b:'b'};
  return {mapping,localTxTo:swapped?'remote-tx':'remote-rx',remoteTxTo:swapped?'local-tx':'local-rx',
    receiversLit:!swapped,vfl:{from:strand,to:mapping[strand],matches:!swapped}};
}
const text=(x,y,value,extra='')=>`<text x="${x}" y="${y}" class="pol-text ${extra}">${value}</text>`;
const circle=(x,y)=>`<circle class="pol-channel" cx="${x}" cy="${y}" r="10"/>`;

function picture(state,mobile) {
  const model=polarityExample(state),vfl=state.mode==='vfl',pick=state.strand==='a'?0:1;
  const xs=mobile?[125,235]:[145,755],ys=mobile?[100,560]:[145,225];
  const local=i=>mobile?[xs[i],100]:[145,ys[i]];
  const remote=i=>mobile?[xs[i],560]:[755,ys[i]];
  const end=i=>mobile?[xs[i],417]:[565,ys[i]];
  const line=(i,back=false)=>{
    const j=state.swapped?1-i:i, start=local(i),finish=vfl?end(j):remote(j);
    if(mobile) return back?`M${finish[0]} ${finish[1]} V365 C${finish[0]} 320 ${start[0]} 320 ${start[0]} 275 V100`:
      `M${start[0]} 100 V275 C${start[0]} 320 ${finish[0]} 320 ${finish[0]} 365 V${finish[1]}`;
    return back?`M${finish[0]} ${finish[1]} H505 C465 ${finish[1]} 440 ${start[1]} 400 ${start[1]} H145`:
      `M145 ${start[1]} H400 C440 ${start[1]} 465 ${finish[1]} 505 ${finish[1]} H${finish[0]}`;
  };
  let body='';
  if(mobile) {
    body+=`<rect class="pol-device" x="20" y="15" width="320" height="105" rx="12"/><rect class="pol-tab" x="35" y="15" width="290" height="8" rx="4"/>`;
    body+=text(180,47,vfl?'Local optic disconnected':'Device A · local optic','center');
    body+=`<rect class="pol-device ${vfl?'muted':''}" x="20" y="530" width="320" height="95" rx="12"/><rect class="pol-tab ${vfl?'muted':''}" x="35" y="617" width="290" height="8" rx="4"/>`;
    body+=text(180,603,vfl?'Onward fiber unplugged':'Device B · remote optic','center');
  } else {
    body+=`<rect class="pol-device" x="20" y="65" width="155" height="230" rx="12"/><rect class="pol-tab" x="33" y="65" width="129" height="8" rx="4"/><rect class="pol-device ${vfl?'muted':''}" x="725" y="65" width="155" height="230" rx="12"/><rect class="pol-tab ${vfl?'muted':''}" x="738" y="65" width="129" height="8" rx="4"/>`;
    body+=text(97,99,vfl?'LC legs':'Local optic','center')+text(802,99,vfl?'Onward fiber':'Remote optic','center');
    body+=text(97,277,vfl?'Disconnected':'Device A','center small')+text(802,277,vfl?'Unplugged':'Device B','center small');
  }
  for(let p=0;p<2;p++) {
    const cx=335+p*230,cy=242+p*175;
    body+=mobile?`<rect class="pol-cas" x="60" y="${cy-52}" width="240" height="75" rx="8"/>${text(180,cy-27,`CAS ${p+1} · Port 12`,'center on-dark')}`:
      `<rect class="pol-cas" x="${cx-60}" y="85" width="120" height="190" rx="8"/>${text(cx,111,`CAS ${p+1}`,'center on-dark')}${text(cx,255,'Port 12','center on-dark small')}`;
  }
  for(let i=0;i<2;i++) {
    body+=`<path class="pol-fiber-edge" d="${line(i)}"/><path class="pol-fiber" d="${line(i)}"/>`;
    if(vfl) body+=`<path class="pol-unplugged" d="${mobile?`M${xs[i]} 470 V560`:`M620 ${ys[i]} H755`}"/>`;
    const a=local(i),b=remote(i),channel=i?'B':'A';
    body+=circle(...a)+circle(...b);
    body+=text(mobile?a[0]:78,mobile?81:a[1]+5,vfl?`LC ${channel}`:i?'RX':'TX',`center ${vfl&&i===pick?'selected':''}`);
    body+=text(mobile?b[0]:820,mobile?582:b[1]+5,vfl?channel:i?'TX':'RX','center');
    for(let p=0;p<2;p++) {
      const x=mobile?xs[i]:335+p*230,y=mobile?242+p*175:ys[i];
      body+=`<rect class="pol-adapter" x="${x-17}" y="${y-17}" width="34" height="34" rx="4"/>${circle(x,y)}${text(mobile?x-29:x+35,mobile?y+5:y-12,channel,'center on-dark small')}`;
    }
  }
  if(vfl) {
    const [x,y]=local(pick),out=end(model.vfl.to==='a'?0:1);
    body+=mobile?vflPen(x,100,{scale:.78,on:true}):vflPen(145,y,{on:true});
    body+=lightSource(x,y,'red')+lightFlow(line(pick),'red')+lightSource(...out,'red');
    body+=`<circle class="pol-red-glow" cx="${out[0]}" cy="${out[1]}" r="18"/><path class="pol-beam" d="${mobile?`M${out[0]} ${out[1]} l-14 38 h28 Z`:`M${out[0]} ${out[1]} l38 -14 v28 Z`}"/>`;
  } else {
    body+=lightSource(...local(0))+lightSource(...remote(1),'return-ir')+lightFlow(line(0));
    // In a swapped pair, both transmitters feed the same fiber in opposite directions.
    body+=lightFlow(line(state.swapped?0:1,true),'return-ir');
    if(model.receiversLit) body+=lightSource(...remote(0))+lightSource(...local(1),'return-ir');
    else for(const [x,y] of [local(1),remote(0)]) body+=`<path class="pol-dark-mark" d="M${x-7} ${y-7} l14 14 m0 -14 l-14 14"/>`;
  }
  if(mobile) for(let p=0;p<2;p++) {
    const cy=242+p*175;
    body+=`<rect class="pol-cas-title" x="78" y="${cy-47}" width="204" height="26" rx="4"/>${text(180,cy-27,`CAS ${p+1} · Port 12`,'center on-dark')}`;
  }
  const desc=vfl?`VFL on LC ${state.strand.toUpperCase()} passes through CAS 1 and exits CAS 2 at ${model.vfl.to.toUpperCase()}. Both optics are disconnected.`:
    state.swapped?'The pair is swapped between CAS 1 and CAS 2. Local TX reaches remote TX; both receivers are dark.':'Each device’s TX passes through CAS 1 and CAS 2 to the other device’s RX.';
  return `<svg class="pol-canvas ${mobile?'pol-mobile':'pol-desktop'}" viewBox="0 0 ${mobile?'360 645':'900 325'}" role="img" aria-label="${desc}">${body}</svg>`;
}

export function polarityLesson() {
  return `<section id="polarity-checks" class="lesson-section" aria-labelledby="pairing-title">
    <h3 id="pairing-title">Polarity: send light to the receiver</h3>
    <p class="section-intro">TX sends. RX receives. Polarity is how the strands connect those jobs through the whole path.</p>
    <div data-polarity-demo></div>
    <p class="picture-note">One duplex pair, enlarged. A / B are teaching labels, not MMC pin numbers or the optic’s /1 and /5 port positions. This example expects A → A and B → B at the passives; use your actual cable and FIM channel map.</p>
    <div class="pol-takeaways">
      <p><b>Light on the other channel?</b> Trace both strands and compare the map. Both may carry light even when their destinations are wrong.</p>
      <p><b>No light on one strand?</b> Check the VFL / adapter, LC, fiber and MMC connections. Compare the loose head with the CAS output. This alone cannot identify a bad ferrule.</p>
      <p><b>A loop passed?</b> It can join TX back to RX even with a swapped pair. Verify the mapped service path after removing the loop.</p>
    </div>
    <p class="lesson-takeaway">A polarity mismatch alone does not turn off local TX. VFL checks routing and continuity; it does not prove acceptable optical loss or optic health.</p>
    <p class="picture-note">For a real VFL test, isolate the section from active optics and use the matching adapter. View light indirectly. Sources: <a href="https://www.usconec.com/featured-products/mmc-connector-solutions/speed-of-deployment" target="_blank" rel="noopener noreferrer">US Conec · polarity mapping</a> · <a href="https://www.flukenetworks.com/edocs/white-paper-troubleshooting-fiber" target="_blank" rel="noopener noreferrer">Fluke · VFL testing</a>.</p>
    <a class="lesson-return" href="./index.html">Use this in Troubleshoot →</a>
  </section>`;
}

export function mountPolarityLesson(root) {
  const host=root.querySelector('[data-polarity-demo]');
  if(!host)return;
  const state={mode:'service',swapped:false,strand:'a'};
  host.innerHTML=`<div class="pol-controls"><div class="lesson-options" role="group" aria-label="Polarity light source"><button type="button" data-pol-mode="service">Optic light</button><button type="button" data-pol-mode="vfl">VFL trace</button></div><button type="button" class="pol-swap" data-pol-swap aria-pressed="false">Swap the pair</button></div>
    <div class="pol-strands lesson-options" role="group" aria-label="VFL strand to trace" hidden><button type="button" data-pol-strand="a">VFL on LC A</button><button type="button" data-pol-strand="b">VFL on LC B</button></div>
    <figure class="pol-figure"><div class="pol-picture"></div><figcaption class="pol-caption" aria-live="polite"></figcaption></figure>`;
  function draw() {
    const model=polarityExample(state),vfl=state.mode==='vfl';
    host.querySelector('.pol-picture').innerHTML=picture(state,false)+picture(state,true);
    host.querySelector('.pol-strands').hidden=!vfl;
    host.querySelectorAll('[data-pol-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.polMode===state.mode)));
    host.querySelectorAll('[data-pol-strand]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.polStrand===state.strand)));
    host.querySelector('[data-pol-swap]').setAttribute('aria-pressed',String(state.swapped));
    host.querySelector('[data-pol-swap]').textContent=state.swapped?'Correct the pair':'Swap the pair';
    const title=vfl?`LC ${state.strand.toUpperCase()} → CAS 2 channel ${model.vfl.to.toUpperCase()}`:state.swapped?'TX meets TX. Both RX paths are dark.':'TX reaches RX in both directions.';
    const detail=vfl?state.swapped?'Light is present, but on the other channel. Switch LC A / B to check the second strand.':'Red exits at the expected channel. Switch LC A / B, or swap the pair to compare.':state.swapped?'Both transmitters still emit. The passive connections route their light to the wrong destination.':'The CAS connections carry the light; they do not create it. Swap the pair to see what changes.';
    host.querySelector('.pol-caption').innerHTML=`<b>${title}</b><span>${detail}</span><small>${vfl?'Red = visible VFL · onward fiber unplugged at CAS 2':'Blue / teal = invisible optic IR · yellow = fiber'}</small>`;
  }
  host.addEventListener('click',event=>{
    const button=event.target.closest('button');
    if(!button)return;
    if(button.hasAttribute('data-pol-mode'))state.mode=button.dataset.polMode;
    else if(button.hasAttribute('data-pol-strand'))state.strand=button.dataset.polStrand;
    else if(button.hasAttribute('data-pol-swap'))state.swapped=!state.swapped;
    else return;
    draw();
  });
  draw();
}
