import Parameter from "./Parameter";

export default class Knob extends Parameter {
  constructor(value, range, step, cv, callback) {
    super(value, range, step, cv, callback);
    this.callback = callback;
  }

  handler() {
    this.callback(this.value);
  }

  cvHandler(value) {
    // this.value = value;
    this.callback(value);
  }

  display() {
    return this.value;
  }
}