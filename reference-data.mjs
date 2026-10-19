import {translate,getLanguage} from './locale.mjs?v=17';
const foa = ['FOA · fiber testing', 'https://www.thefoa.org/tech/ref/basic/test.html'];
const units = ['FOA · dB and dBm', 'https://www.thefoa.org/tech/ref/testing/test/dB.html'];
const jargon = ['FOA · illustrated terms', 'https://www.thefoa.org/tech/ref/basic/jargon.html'];
const cisco = ['Cisco · optic health', 'https://www.cisco.com/c/en/us/support/docs/switches/catalyst-9200-switch-stack/222738-troubleshoot-fiber-links-on-catalyst-900.html'];
const mmc = ['US Conec · MMC connectors', 'https://www.usconec.com/featured-products/mmc-connector-solutions/performance'];

// Course/site names intentionally have no guessed acronym expansion.
export const referenceTerms = [
  {id:'optic', label:'Optic', also:'Optical transceiver', group:'Hardware', aliases:['transceiver','optical module'], art:'optic', anchor:'optics',
    definition:'A module in the device that converts electrical data into light and received light back into electrical data.', purpose:'Its TX sends; its RX receives. It lets the device communicate over fiber.', source:jargon},
  {id:'fiber', label:'Fiber', also:'The light-carrying strand', group:'Hardware', aliases:['strand','fiber cable'], art:'fiber', anchor:'path',
    definition:'A thin glass path that carries light between connections.', purpose:'Trace the mapped strand through each connection; the cable itself does not generate light.'},
  {id:'lc', label:'LC', also:'Optic-side connector', group:'Hardware', aliases:['LC connector','duplex LC'], art:'lc', anchor:'lc-position',
    definition:'The small connector used at the optic in this course. Two LC connections form the illustrated TX/RX pair.', purpose:'Match the assigned optic position and orientation. A duplex pair contains two fiber strands.'},
  {id:'mmc', label:'MMC', also:'Multi-fiber connector', group:'Hardware', aliases:['MMC head','leader','head'], art:'mmc', anchor:'mmc-fanout',
    definition:'A compact connector that brings several fiber paths together at one mating interface.', purpose:'In our fanout examples, this is the head connected at the CAS. Its fibers stay separate; it does not split one signal.', source:mmc},
  {id:'cas', label:'CAS / cassette', also:'Site label · passive connection point', group:'Hardware', aliases:['CAS','cassette','passive','passives'], art:'cas', anchor:'ends',
    definition:'The passive connection point shown in our fiber routes. It connects mapped fiber paths without making light.', purpose:'Our front view has ports 1–16 above 17–32. Match the actual CAS, port and route in the connection record.'},
  {id:'fanout', label:'Fanout', also:'One head, multiple followers', group:'Hardware', aliases:['assembly','breakout'], art:'fanout', anchor:'mmc-fanout',
    definition:'An assembly that brings separate follower paths into one multi-fiber head.', purpose:'The example has 12 followers sharing a head serial. Count legs and individual strands separately; one duplex leg has two strands.'},
  {id:'follower', label:'Follower / leg', also:'One branch of the fanout', group:'Hardware', aliases:['follower','followers','leg','legs'], art:'fanout', anchor:'fim-path',
    definition:'A labeled branch of the fanout that connects to its assigned optic position.', purpose:'Match the leg ID as well as the head serial. Followers from the same head are not interchangeable.'},
  {id:'ferrule', label:'Ferrule', also:'Fiber holder at the connector face', group:'Hardware', aliases:['ferrite','connector face','end face'], art:'ferrule', anchor:'fault-evidence',
    definition:'The precision part that holds and aligns fibers where connectors meet.', purpose:'Dirt or damage here can affect a channel. The component is called a ferrule; its shape depends on the connector.', source:mmc},
  {id:'tx', label:'TX', also:'Transmit', group:'Light & readings', aliases:['transmit','transmitter','sending'], art:'tx', anchor:'optics',
    definition:'The optic’s sending side. It turns outgoing device data into light.', purpose:'Follow local TX through the mapped path to remote RX. A local TX reading does not prove that light arrived there.', source:cisco},
  {id:'rx', label:'RX', also:'Receive', group:'Light & readings', aliases:['receive','receiver','receiving'], art:'rx', anchor:'readings',
    definition:'The optic’s receiving side. It detects incoming light and converts the signal back to electrical data.', purpose:'Check each required lane against that optic’s lower and upper limits.', source:cisco},
  {id:'ir', label:'IR', also:'Infrared light', group:'Light & readings', aliases:['infrared','invisible'], art:'ir', anchor:'optics',
    definition:'Light outside the visible range, used by the optics in our examples.', purpose:'Blue arrows in the course represent invisible IR. They are not a literal glow you can see on the cable.', source:foa},
  {id:'dbm', label:'dBm', also:'Optical power relative to 1 milliwatt', group:'Light & readings', aliases:['power','reading','0 dBm'], art:'power', anchor:'readings',
    definition:'A unit for optical power. Zero dBm equals 1 milliwatt; negative dBm still represents some power.', purpose:'Zero is not a universal “perfect” reading. Use the installed optic’s allowed range.', source:units},
  {id:'no-light', label:'−40 / no light', also:'Site report example', group:'Light & readings', aliases:['-40','−40','no light','dark'], art:'dark', anchor:'fault-evidence',
    definition:'In the report examples used here, −40 is the no-light indication.', purpose:'It is a symptom, not the cause. Check the source, connections, mapped path and test setup before blaming a part.'},
  {id:'attenuation', label:'Attenuation', also:'Loss of optical power', group:'Light & readings', aliases:['loss','dB','weak light','bend loss'], art:'loss', anchor:'readings',
    definition:'A reduction in light power as it travels through fiber and connections. Loss is expressed in dB.', purpose:'Too much loss can leave RX below its required minimum even when some light gets through.', source:units},
  {id:'polarity', label:'Polarity', also:'Correct TX-to-RX pairing', group:'Connections & tests', aliases:['swapped pair','pairing','swap'], art:'polarity', anchor:'polarity-checks',
    definition:'The fiber mapping that connects each transmitter to the intended receiver.', purpose:'For the duplex example: A TX → B RX, and B TX → A RX. A swapped pair can break the link without turning the transmitter off.', source:cisco},
  {id:'loopback', label:'Loopback', also:'Return TX light to RX', group:'Connections & tests', aliases:['loop','LC loop','MMC loop','loop back'], art:'loop', anchor:'loopbacks',
    definition:'A test connection that routes transmitted light back to the intended receive path.', purpose:'A direct LC loop tests the optic. A loop farther along includes the fiber and connections to that point. Use the correct mapping and required attenuation.', source:cisco},
  {id:'vfl', label:'VFL', also:'Visual fault locator', group:'Connections & tests', aliases:['visual fault locator','red light','trace'], art:'vfl', anchor:'vfl',
    definition:'A separate tool that puts visible red light into fiber for tracing.', purpose:'Use on fiber isolated from active equipment with the correct adapter. Observe safely from the side; never look into an illuminated end.', source:foa},
  {id:'continuity', label:'Continuity', also:'An unbroken light path', group:'Connections & tests', aliases:['continuous','light passes'], art:'vfl', anchor:'test-evidence',
    definition:'Light can travel through the tested strand from one point to another.', purpose:'Seeing VFL light at the expected endpoint helps confirm the route. It does not prove acceptable IR loss.', source:foa},
  {id:'misport', label:'Misport', also:'Connected to the wrong port', group:'Connections & tests', aliases:['wrong port','wrong destination'], art:'misport', anchor:'ports',
    definition:'A connection is seated in a different port from the one assigned in the record.', purpose:'Match the device, CAS and port labels. Light at an unexpected port is a reason to check the mapping.'},
  {id:'splice', label:'Splice', also:'A joint between fibers', group:'Connections & tests', aliases:['joint','splicing'], art:'splice', anchor:'fault-evidence',
    definition:'A joint that joins two fiber ends into one path.', purpose:'A poor joint can add loss or interrupt light. A dark reading alone cannot identify a splice as the cause.', source:foa},
  {id:'local-remote', label:'Local / remote', also:'Your end and the other end', group:'Site & records', aliases:['local','remote','endpoint','device'], art:'ends', anchor:'viewpoint',
    definition:'Local is the device you are working from. Remote is the device at the other end of the link.', purpose:'These names depend on your viewpoint. Each device has its own TX and RX.'},
  {id:'lldp', label:'LLDP', also:'Link Layer Discovery Protocol', group:'Site & records', aliases:['neighbor','neighbour','neighbor discovery','local LLDP','remote LLDP'], art:'lldp', anchor:'lldp-neighbors',
    definition:'A shared way for devices to announce their name and port over the existing link. Local is the device whose report you’re reading; remote is the other end.', purpose:'LLDP lists the remote device as a neighbor. Passive cassettes between them do not become neighbors. Compare the reported name and port with FIM. LLDP adds no backup connection and does not prove optical health.', source:['Cisco · LLDP neighbors','https://developer.cisco.com/docs/sonic/lldp/']},
  {id:'fim', label:'FIM', also:'Site connection record', group:'Site & records', aliases:['connection record','ticket','mapping'], art:'ticket', anchor:'fim-path',
    definition:'The record used in this course to look up devices, ports, followers, heads and passive connections.', purpose:'Use it to confirm the expected path. The record tells you where a connection belongs; it is not a live light measurement.'},
  {id:'cable-guy', label:'Cable Guy', also:'Site optic-health report', group:'Site & records', aliases:['health report','optic health'], art:'power', anchor:'readings',
    definition:'The system used in your site examples to view optic-health readings.', purpose:'Read TX/RX per lane and the applicable limits. This learning site does not pull live reports from Cable Guy.'},
  {id:'rack-position', label:'Rack position', also:'Building → room → row → rack → elevation', group:'Site & records', aliases:['rack','elevation','QNO5.5C.16f.17.30','location'], art:'rack', anchor:'position',
    definition:'The site address used to locate the device within a building and rack.', purpose:'QNO5.5C.16f.17.30 means building QNO5, room 5C, row 16 front, rack 17, elevation 30 in our example.'}
];

export const referenceGroups = [...new Set(referenceTerms.map(term => term.group))];
const normalize = value => value.toLowerCase().normalize('NFD').replace(/\p{M}/gu,'').replaceAll('−', '-').trim();
export function searchReference(query = '', group = '', language = getLanguage()) {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  return referenceTerms.filter(term => (!group || term.group === group) && words.every(word =>
    normalize([term.label, term.also, ...term.aliases].flatMap(value=>[value,translate(value,language)]).join(' ')).includes(word)));
}
