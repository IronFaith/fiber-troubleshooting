// Original schematic hardware shared by the tray and connected test views.
// LC mating contact is (0,0); its cable exits at (-64,0). Colors are illustrative.
import {lightFlow} from './light-visuals.mjs?v=1';
export function lcConnector(x=0,y=0,{scale=1,seated=false,reverse=false}={}) {
  return `<g class="lc-connector" transform="translate(${x} ${y}) scale(${reverse?-scale:scale} ${scale})" stroke-linejoin="round">
    <path d="M-64 -4 L-53 -6 H-37 V6 H-53 L-64 4 Z" fill="#577583" stroke="#2e4f60" stroke-width="1.2"/>
    ${[-56,-51,-46,-41].map(x=>`<path d="M${x} -5 v10" stroke="#2f5265" stroke-width="2"/><path d="M${x-1} -5 v3" stroke="#a6c1ca" stroke-width=".8"/>`).join('')}
    <path d="M-38 -10 H-15 L-9 -6 V7 L-15 11 H-38 Z" fill="#a8d1e3" stroke="#31566e" stroke-width="1.3"/>
    <path d="M-36 -7 H-17 L-12 -4 M-35 -6 V7" fill="none" stroke="#e1f1f7" stroke-width="1.3"/>
    <path d="M-36 8 H-15 L-10 5 V8 L-15 12 H-36 Z" fill="#76a9c2"/>
    <path d="M-34 -11 L-31 -15 H-19 L-12 -10 H-7 V-7 H-15 L-21 -11 Z" fill="#e1eff3" stroke="#42697c" stroke-width="1"/>
    <path d="M-30 -4 v10 m5 -10 v10 m5 -10 v10" stroke="#669eb8" stroke-width="1.2"/>
    <path d="M-12 -6 H-6 V7 H-12 Z" fill="#c5d8df" stroke="#42697c" stroke-width="1"/>
    ${seated?'<path d="M-7 -7 H2 V8 H-7 Z" fill="#8abbd1" stroke="#42697c" stroke-width="1"/>':'<path d="M-6 -3 H0 V3 H-6 Z" fill="#fffef3" stroke="#89969a" stroke-width=".8"/><path d="M0 -2 V2" stroke="#d8dbd0" stroke-width="1.2"/>'}
  </g>`;
}

// Both mating tips are on the right, vertically paired like the site's optic.
export function lcLoopback(x=0,y=0,{gap=46,scale=1,seated=false,result}={}) {
  const path=`M0 0 H-75 C-119 0 -119 ${gap} -75 ${gap} H0`;
  return `<g class="lc-loopback" transform="translate(${x} ${y}) scale(${scale})">
    <path d="${path}" fill="none" stroke="#987b32" stroke-width="7" stroke-linecap="round"/>
    <path d="${path}" fill="none" stroke="#f0cd55" stroke-width="4.6" stroke-linecap="round"/>
    <path d="M-76 -1 C-114 -1 -114 ${gap-1} -76 ${gap-1}" fill="none" stroke="#fff0aa" stroke-width="1.2" stroke-linecap="round"/>
    <rect x="-35" y="7" width="13" height="${gap-14}" rx="3" fill="#88b8ce" fill-opacity=".85" stroke="#3f6b83" stroke-width="1.2"/>
    <path d="M-32 10 V${gap-10}" stroke="#d9edf4" stroke-width="1.4"/>
    ${lcConnector(0,0,{seated})}${lcConnector(0,gap,{seated})}
    ${['pass','weak'].includes(result)?`<g class="${result==='weak'?'ts-weak-flow':''}">${lightFlow(`M0 0 H-75 C-97 0 -108 ${gap/4} -108 ${gap/2}`)}${lightFlow(`M-108 ${gap/2} C-108 ${gap*.75} -97 ${gap} -75 ${gap} H0`,'return-ir')}</g>`:''}
  </g>`;
}

// Pen-style VFL with a fitted LC-sized adapter; output at (0,0).
// The indicator shows the source is on, never a pass at the far end.
export function vflPen(x=0,y=0,{scale=1,reverse=false,on=false,label=true}={}) {
  return `<g class="vfl-pen" transform="translate(${x} ${y}) scale(${reverse?-scale:scale} ${scale})" stroke-linejoin="round">
    <rect x="-101" y="-10" width="76" height="20" rx="8" fill="#b72e49" stroke="#702438" stroke-width="1.3"/>
    <path d="M-92 -7 H-36" stroke="#ee93a4" stroke-width="2" stroke-linecap="round"/>
    <path d="M-92 7 H-32" stroke="#8b2037" stroke-width="2"/>
    <path d="M-98 -8 H-91 V8 H-98 Q-104 0 -98 -8Z" fill="#303d45" stroke="#1d2c35" stroke-width="1.1"/>
    ${[-87,-83,-79].map(x=>`<path d="M${x} -8 V8" stroke="#7d2139" stroke-width="1.6"/>`).join('')}
    <rect x="-34" y="-9" width="14" height="18" rx="2" fill="#cad4da" stroke="#566b77" stroke-width="1.2"/>
    <path d="M-31 -7 V7 M-27 -7 V7 M-23 -7 V7" stroke="#edf3f6" stroke-width="1"/>
    <path d="M-20 -6 H-7 V6 H-20Z" fill="#3b4c56" stroke="#233b49" stroke-width="1.2"/>
    <path d="M-16 -4 H-8" stroke="#8ba0ac" stroke-width="1.3"/>
    <rect x="-7" y="-4.5" width="7" height="9" rx="1" fill="#d2dce2" stroke="#5f7481" stroke-width="1"/>
    <path d="M0 -3 V3" stroke="#243c47" stroke-width="2"/>
    <circle cx="-43" cy="0" r="3.8" fill="#3d2631" stroke="#f9b8c6" stroke-width=".9"/>
    <path d="M-43 -2 V0 M-45 -.5 A2.2 2.2 0 1 0 -41 -.5" fill="none" stroke="#fff1f4" stroke-width=".7"/>
    <circle cx="-53" cy="-5" r="1.8" fill="${on?'#ffcccf':'#6b3947'}"/>
    ${label?'<text x="-67" y="3" text-anchor="middle" fill="#fff5f7" font-family="Segoe UI,sans-serif" font-size="7" font-weight="700">VFL</text>':''}
  </g>`;
}
