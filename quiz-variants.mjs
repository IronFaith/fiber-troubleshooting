// Alternate scenarios occupy an existing skill slot; exams remain five questions.
export const questionVariants = [
  {
    id:'lldp-purpose', variantOf:'low-reading', topic:2, visual:'lldp-purpose', skill:'Identify the connected device',
    prompt:'Device A receives an LLDP message from Device B. What does this help A check?',
    choices:['Which device and port are connected at the other end.', 'Whether every fiber has acceptable optical loss.', 'Whether a second, backup cable has been installed.'], correct:0,
    explanation:'LLDP means Link Layer Discovery Protocol. Devices announce their identity and port over the existing connection. A lists B as its neighbor, even with passive cassettes between them. Check light health separately.',
    reveal:'LLDP identifies the other end of the existing link.', lesson:'devices.html#lldp-neighbors'
  },
  {
    id:'lldp-wrong-port', variantOf:'bend-check', topic:1, visual:'lldp-port', skill:'Compare the reported neighbor with FIM',
    prompt:'The device name matches FIM, but the neighbor port does not. What should you do next?',
    choices:['Accept it because the device name matches.', 'Replace the optic because LLDP measures weak light.', 'Compare the actual patching and labels with the expected device AND port.'], correct:2,
    explanation:'The expected endpoint includes both the device and its port. A fresh LLDP report can reveal a mapping mismatch. Verify the patching and record before deciding what needs correction; LLDP is not an optical-power measurement.',
    reveal:'Matching the device alone does not match the full assignment.', lesson:'devices.html#lldp-neighbors', relatedLessons:[['Confirm the assigned ports','devices.html#ports']]
  },
  {
    id:'lldp-wrong-device', variantOf:'applied-data-journey', topic:5, visual:'lldp-device', skill:'Combine identity and light evidence',
    prompt:'Light readings are within the supplied limits, but a fresh LLDP report names Device C instead of the assigned Device B. Which conclusion is supported?',
    choices:['The assigned connection is verified because light is healthy.', 'The reported endpoint disagrees with FIM; investigate the mapping even though light is present.', 'The first CAS must be generating the wrong LLDP identity.', 'The local optic is proven defective.'], correct:1,
    explanation:'Light being present and reaching the intended device are different checks. Compare the reported device and port with FIM, labels and actual patching. Passive cassettes do not generate LLDP identities, and this mismatch alone does not diagnose a failed optic.',
    reveal:'Healthy light does not prove the correct destination.', lesson:'devices.html#lldp-neighbors', relatedLessons:[['Read power against its limits','learn.html#readings']]
  },
  {
    id:'lldp-missing', variantOf:'applied-local-view', topic:5, visual:'lldp-missing', skill:'Interpret a missing neighbor',
    prompt:'Cable Guy shows no LLDP neighbor. You have not checked fresh light readings, link state or LLDP operation. What can you conclude?',
    choices:['The fiber is definitely broken.', 'The remote device is definitely in the wrong port.', 'Both optics are healthy because LLDP is separate from light.', 'The neighbor is unconfirmed; check light, link state and whether LLDP is operating before naming a cause.'], correct:3,
    explanation:'A missing neighbor does not locate a fiber fault. The link may be down, or LLDP may not be sending or receiving. Use a fresh report, check TX/RX and link state, and verify LLDP operation with the appropriate team.',
    reveal:'No neighbor is an observation, not a diagnosis.', lesson:'devices.html#lldp-neighbors'
  }
];
