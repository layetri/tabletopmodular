import Voice from "./modules/Voice";
import Filter from "./modules/Filter";
import LFO from "./modules/LFO";
import Sequencer from "./modules/Sequencer";
import Delay from "./modules/Delay";

export default class Player {
  constructor({name, id, color}, current) {
    this.id = id;
    this.name = name;
    this.instrument = null;
    this.isCurrentUser = this.id === current;
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
}