import Module from "./Module";

import Voice from "./modules/voice";
import Filter from "./modules/filter";
import LFO from "./modules/LFO";
import Sequencer from "./modules/Sequencer";

export default class Player {
  constructor({name, id}, connection) {
    this.id = id;
    this.name = name;
    this.instrument = null;
    this.connection = connection;
  }

  setInstrument(instrument, context) {
    switch (instrument) {
      case 'voice':
        this.instrument = new Voice(context);
        break;
      case 'lfo':
        this.instrument = new LFO(context);
        break;
      case 'filter':
        this.instrument = new Filter(context);
        break;
      case 'sequencer':
        this.instrument = new Sequencer(8);
        break;
    }
  }

  controlInstrument(parameter, value) {
    this.instrument.set(parameter, value);
  }
}