import Module from "../Module";
import Knob from "../class/Knob";
import SteppedKnob from "../class/SteppedKnob";

export default class Filter extends Module {
  constructor() {
    super('lfo');
    super.parameters = {
      frequency: new Knob(50.0, [1, 100], 1, true, val => {
        this.process.frequency.value = val;
      }),
      waveform: new SteppedKnob(0, [0, 3], ['sine', 'triangle', 'sawtooth', 'square'], false, val => {
        this.process.type = val;
      })
    };

    super.process = new Tone.LFO(super.parameters.frequency.value);
    super.process.type = 'sine';
    super.init();

    super.connections = {
      output: {
        // Can only connect to: {direction: input, type: audio}
        direction: 'output',
        type: 'cv',
        connectedTo: null,
        patch: destination => {
          if(this.connections.output.connectedTo === null) {
            this.connections.output.connectedTo = destination;
            this.process.connect(destination);
          } else {
            this.connections.output.connectedTo = null;
            this.process.disconnect(destination);
          }
        }
      }
    };
  }

  destroy() {
    super.process.stop();
    // super.process.dispose();
  }
}