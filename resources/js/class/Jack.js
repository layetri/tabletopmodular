export default class Jack {
  constructor(name, direction, type, connectedTo) {
    this.name = name;
    this.direction = direction;
    this.type = type;
    this.connectedTo = connectedTo;
    this.color = Math.round(Math.random() * 8);
  }
}