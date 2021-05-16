import Parameter from "./Parameter";

export default class SteppedKnob extends Parameter {
  constructor(value, range, values, cv, callback) {
    super(value, range, 1, cv, callback);

    this.values = values;
    this.callback = callback;
  }

  handler() {
    this.callback(this.values[this.value]);
  }

  cvHandler(value) {
    this.value = value;
    this.handler();
  }

  display() {
    return this.values[this.value];
  }
}