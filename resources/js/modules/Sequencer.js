import Module from "../Module";
import Knob from "../class/Knob";

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
      speed: new Knob(120, [60, 240], 1, true, val => {
        this.tpq = 60000 / val;

        // TODO: find a more elegant solution for on-the-fly speed changes
        if(this.state) {
          this.toggle();
          this.toggle();
        }
      })
    }


    this.connections = {
      pitch: {
        type: 'cv',
        direction: 'output',
        patch: destination => {
          this.destination = destination;
        }
      }
    }
  }

  toggle() {
    if(!this.state) {
      this.timingEngine = setInterval(() => {
        if(this.currentStep < this.numberOfSteps - 1) {
          this.currentStep++;
        } else {
          this.currentStep = 0;
        }
        this.handleCV();
      }, this.tpq);
    } else {
      clearInterval(this.timingEngine);
    }

    this.state = !this.state;
  }

  handleCV() {
    console.log(this.destination);
    this.destination(this.steps[this.currentStep].value);
  }
}

class Step {
  constructor(order) {
    this.state = true;
    this.value = 50;
    this.order = order;
  }

  toggle() {
    this.state = !this.state;
  }
}