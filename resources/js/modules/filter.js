import Module from "../Module";
import AudioOutput from "../class/AudioOutput";

export default class Filter extends Module {
  constructor() {
    super('filter');
    super.parameters = {
      cutoff: {
        value: 440.0,
        display: () => {
          return this.parameters.cutoff.value;
        },
        range: [50, 1000],
        step: 1,
        cv: true,
        handler: () => {
          this.process.frequency.value = this.parameters.cutoff.value;
        }
      },
      resonance: {
        value: 0,
        display: () => {
          return this.parameters.resonance.value;
        },
        range: [0, 100],
        step: 1,
        cv: true,
        handler: () => {
          this.process.Q.value = this.parameters.resonance.value;
        }
      }
    };

    super.process = new Tone.Filter(2000, 'lowpass');

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