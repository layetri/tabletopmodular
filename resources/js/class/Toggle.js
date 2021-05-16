import Parameter from "./Parameter";

export default class Toggle extends Parameter {
  constructor(value, cv, callback) {
    super(true, [false, true], 1, cv, callback);
  }

  set() {
    this.value = !this.value;
  }

  handler() {
    this.callback(this.value);
  }

  cvHandler(value) {
    this.value = value;
    this.handler();
  }

  display() {
    return this.value ? 'on' : 'off';
  }
}