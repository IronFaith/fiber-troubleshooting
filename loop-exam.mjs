export const loopTopic=6;
export const loopTitle='Loopbacks';
export const loopDescription='Explain why and where to loop, what a result proves, and what to check next.';
export const loopQuestions=[
  {
    id:'loop-exam-location',topic:loopTopic,visual:'loop-location',skill:'Choose the loop location',
    prompt:'You need to include the fiber from the local optic to CAS 1 in a loop test. Where does the approved loopback go?',
    choices:['Directly in the local optic, leaving the installed fiber out.','At the mapped CAS 1 connection, returning the tested pair toward the local optic.','At any empty CAS port, because all ports share the same fiber.'],correct:1,
    explanation:'The MMC loopback at the mapped CAS connection turns the outgoing path back toward local RX. This includes the optic and the fiber and connections up to that loop point. Use the correct pair and approved setup; the onward path and remote optic remain outside the test.',
    reveal:'The loop location sets the boundary of the test.',lesson:'learn.html#loopbacks'
  },
  {
    id:'loop-exam-failure',topic:loopTopic,visual:'loop-tool-lc',skill:'Check a failed loop setup',
    prompt:'The first direct LC loop reports no return light. What should you do before declaring the optic faulty?',
    choices:['Replace the remote optic; it must send the return light.','Repeat the same test without checking its setup.','Verify the approved loop, pair, seating and required attenuation; inspect and clean as needed, then retest.'],correct:2,
    explanation:'A direct loop returns the local optic’s own light. A failed result can come from the test setup as well as the optic. Validate the setup and retest; if it still fails, use the approved known-good comparison to isolate the cause. The remote optic is not part of this test.',
    reveal:'A failed loop is evidence to investigate, not a failed-part diagnosis.',lesson:'learn.html#loopbacks'
  },
  {
    id:'loop-exam-restore',topic:loopTopic,visual:'loop-tool-mmc',skill:'Verify service after looping',
    prompt:'An MMC loop at CAS 1 passes. What must happen before you can call the service restored?',
    choices:['Leave the loop installed so local TX continues returning to local RX.','Remove the loop, restore the mapped service connections, and check required lanes, optic limits and link status.','Accept a visible VFL glow as proof that network optical loss is acceptable.'],correct:1,
    explanation:'A loop pass applies to the tested return path. Remove the test tool and normalize the service connections, then verify the restored link. The pass does not clear untested fiber or the remote optic. VFL continuity also cannot confirm acceptable infrared loss.',
    reveal:'Loop passed → normalize → verify the restored service.',lesson:'learn.html#compare-loops'
  }
];
