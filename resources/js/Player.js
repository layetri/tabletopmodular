import Module from "./Module";

import Voice from "./modules/voice";
import Filter from "./modules/filter";
import LFO from "./modules/LFO";
import Sequencer from "./modules/Sequencer";
import Delay from "./modules/Delay";

export default class Player {
  constructor({name, id, color}, connection) {
    this.id = id;
    this.name = name;
    this.instrument = null;
    this.connection = connection;
  }

  setInstrument(instrument) {
    switch (instrument) {
      case 'voice':
        this.instrument = new Voice();
        break;
      case 'lfo':
        this.instrument = new LFO();
        break;
      case 'filter':
        this.instrument = new Filter();
        break;
      case 'sequencer':
        this.instrument = new Sequencer(8);
        break;
      case 'delay':
        this.instrument = new Delay();
        break;
    }
  }

  controlInstrument(parameter, value) {
    this.instrument.set(parameter, value);
  }
}