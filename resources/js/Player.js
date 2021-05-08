import Module from "./Module";

export default class Player {
  constructor({name, id}) {
    this.id = id;
    this.name = name;
    this.instrument = null;
  }

  setInstrument(instrument) {
    this.instrument = new Module(instrument);
  }

  controlInstrument(parameter, value) {
    this.instrument.set(parameter, value);
  }
}