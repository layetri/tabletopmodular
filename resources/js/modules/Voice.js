import Module from "../Module";
import AudioOutput from "../class/AudioOutput";
import Knob from "../class/Knob";
import SteppedKnob from "../class/SteppedKnob";

export default class Voice extends Module {
  constructor() {
    // Initialize the parent class
    super('voice');

    // Initialize the module's parameters
    super.parameters = {
      frequency: new Knob(440.0, [50, 1000], 1, true, val => {
        this.process.frequency.value = val;
      }),
      waveform: new SteppedKnob(0, [0, 3], ['sine', 'triangle', 'sawtooth', 'square'], false, val => {
        this.process.type = val;
      })
    };

    // Initialize the module's core function (e.g. sound source or custom process)
    super.process = new Tone.Oscillator(440, 'sine');
    super.init();
    // [Future]: add second oscillator for more sound possibilities

    // Fill the module's connection array
    super.connections = {
      frequency: {
        type: 'cv',
        direction: 'input',
        connectedTo: null,
        handler: this.parameters.frequency.cvHandler,
        getNode: () => {
          return this.parameters.frequency
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
    this.process.stop();
    // this.process.dispose();
  }
}