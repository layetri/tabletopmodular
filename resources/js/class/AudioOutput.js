export default class AudioOutput {
  constructor(name, connectCallback, disconnectCallback) {
    this.name = name;
    this.direction = 'output';
    this.type = 'audio';
    this.connectedTo = null;

    this.connect = connectCallback;
    this.disconnect = disconnectCallback;
  }

  patch(destination) {
    if(this.connectedTo === null) {
      this.connectedTo = destination;
      this.connect(destination);
    } else {
      this.connectedTo = null;
      this.disconnect(destination);
    }
  }
}