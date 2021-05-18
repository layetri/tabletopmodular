import Module from "../Module";
import AudioOutput from "../class/AudioOutput";
import Knob from "../class/Knob";

export default class Delay extends Module {
  constructor() {
    super('delay');
    super.parameters = {
      delay: new Knob(0.1, [0, 1], 0.1, true, val => {
        this.process.delayTime.value = val;
      }),
      feedback: new Knob(0, [0, 0.9], 0.01, true, val => {
        this.process.feedback.value = val;
      })
    };

    super.process = new Tone.FeedbackDelay(0.1, 0);

    super.connections = {
      input: {
        direction: 'input',
        type: 'audio',
        connectedTo: null,
        patch: source => {
          this.connections.input.connectedTo = source;
        },
        getNode: () => {
          return this.process;
        }
      },
      output: new AudioOutput(
          'output',
          destination => {
            this.process.connect(destination)
          },
          destination => {
            this.process.disconnect(destination)
          })
    };
  }

  destroy() {
    this.process.dispose();
  }
}