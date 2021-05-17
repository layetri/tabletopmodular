const colors = ['palePurple', 'lavenderBlue', 'mountbattenPink', 'rhythm', 'cadetGrey', 'frenchSkyBlue', 'dodgerBlue', 'mayaBlue', 'blizzardBlue', 'magicMint', 'paleSpringBud', 'mistyRose', 'apricot', 'lightOrange', 'flame'];

export default class Module {
  constructor(type) {
    this.type = type;
    this.color = colors[Math.round(Math.random() * (colors.length - 1))];
    this.process = null;
    this.connections = {};
    this.parameters = {};
  }

  init() {
    this.process.start();
    this.process.volume.value = -6;
  }

  connect(source, destination) {
    this.connections[source].patch(destination);
  }

  setParameter(parameter, value) {
    this.parameters[parameter].value = value;
    this.parameters[parameter].handler();
  }
}