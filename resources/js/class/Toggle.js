import Parameter from "./Parameter";

export default class Toggle extends Parameter {
  constructor(value, cv, callback) {
    super(true, [false, true], 1, cv, callback);
  }

  handler() {
    this.value = !this.value;
    this.callback();
  }

  cvHandler(value) {
    this.value = value;
    this.handler();
  }

  display() {
    return this.value ? 'on' : 'off';
  }
}