export default class Parameter {
  constructor(value, range, step, cv, callback) {
    this.value = value;
    this.range = range;
    this.step = step;
    this.cv = cv;
    this.callback = callback;
  }
}