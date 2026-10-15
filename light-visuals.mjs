// Direction cues shared by lessons and troubleshooting. These illustrate light,
// not measured optical health. Callers only draw light on the intended/tested path.
export function lightFlow(path, color = 'ir', strength = '') {
  return `<g class="light-flow ${color} ${strength}" aria-hidden="true">
    <path class="learn-signal ${color}" d="${path}"/>
    <path class="flow-arrow" d="M-8 -5 L3 0 L-8 5 L-4 0 Z" style="offset-path:path('${path}')"/>
  </g>`;
}

export function lightSource(x, y, color = 'ir') {
  return `<g class="light-source ${color}" aria-hidden="true">
    <circle class="light-source-halo" cx="${x}" cy="${y}" r="8"/>
    <circle class="light-source-core" cx="${x}" cy="${y}" r="3"/>
  </g>`;
}
