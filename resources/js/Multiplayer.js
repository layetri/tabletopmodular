export default class Multiplayer {
  constructor(key) {
    this.players = [];

    this.connection = Echo.private('room.'+key);
    this.presence = Echo.join('presence.'+key)
        .here((players) => {
          if(players.length > 5) {
            this.connection.leave();
            this.presence.leave();
          } else {
            for (let i = 0; i < players.length; i++) {
              if (players[i].id !== this.user.id) {
                //this.playerJoins(players[i]);
              }
            }
          }
        }).joining((player) => {
          console.log(player);
          this.playerJoins(player);
        }).leaving((player) => {
          // this.playerLeaves(player);
        });
  }

  playerJoins(player) {

  }
}