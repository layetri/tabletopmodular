import Module from "../Module";
import Knob from "../class/Knob";
import CVOutput from "../class/CVOutput";
import Toggle from "../class/Toggle";

export default class Sequencer extends Module {
  constructor(steps, bpm = 120) {
    super('sequencer');

    this.steps = [];
    for(let i = 0; i < steps; i++) {
      this.steps.push(new Step(i));
    }

    this.numberOfSteps = steps;
    this.currentStep = 0;

    this.state = false;
    this.tpq = 60000 / bpm;
    this.timingEngine = null;

    this.destination = null;

    this.parameters = {
      speed: new Knob(120, [60, 300], 1, true, val => {
        this.tpq = 60000 / val;
      }),
      toggle: new Toggle(false, false, () => {
        this.toggle()
      })
    }

    this.connections = {
      pitch: new CVOutput(
          'pitch',
          destination => {
            this.destination = destination;
          },
          () => {
            this.destination = null;
          })
    }
  }

  toggle() {
    this.state = !this.state;
    if(this.state) {
      this.doStep();
    } else {
      clearTimeout(this.timingEngine);
    }
  }

  doStep() {
    if(this.state) {
      if (this.currentStep < this.numberOfSteps - 1) {
        this.currentStep++;
      } else {
        this.currentStep = 0;
      }
      this.handleCV();

      this.timingEngine = setTimeout(() => {
        this.doStep();
      }, this.tpq);
    }
  }

  handleCV() {
    this.destination.cvHandler(this.steps[this.currentStep].value);
  }
}

class Step {
  constructor(order) {
    this.state = true;
    this.value = 0;
    this.order = order;
  }

  toggle() {
    this.state = !this.state;
  }
}