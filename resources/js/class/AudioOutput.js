import Output from "./Output";

export default class AudioOutput extends Output {
  constructor(name, connectCallback, disconnectCallback) {
    super(name, 'output', 'audio', null);

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