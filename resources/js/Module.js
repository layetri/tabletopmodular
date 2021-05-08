const tone = require('tone');
const colors = ['palePurple', 'lavenderBlue', 'mountbattenPink', 'rhythm', 'cadetGrey', 'frenchSkyBlue', 'dodgerBlue', 'mayaBlue', 'blizzardBlue', 'magicMint', 'paleSpringBud', 'mistyRose', 'apricot', 'lightOrange', 'melon', 'flame'];

export default class Module {
  constructor(type, localAudio) {
    this.type = type;
    this.parameters = {
      frequency: 1000,

    };
    this.color = colors[Math.round(Math.random() * colors.length)];
    this.process = null;
    if(localAudio) {
      switch (type) {
        case 'lfo':

          break;
        case 'voice':
          this.process = new tone.Synth();
          break;
        case 'filter':
          this.process = new tone.Filter();
      }
    }
  }

  connect(to, localAudio) {
    if(localAudio) {
      this.process.chain(to.process);
    }
  }
}