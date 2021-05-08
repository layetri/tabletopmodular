import Module from "../Module";
const tone = require('tone');

export default class LFO {
  constructor() {
    Module.call();
    this.parameters = {

    };
    this.process = new tone.LFO(this.parameters.frequency, 0.1, 100);
  }
}