<template>
  <div>
    <div id="gameScreenContainer">
      <host v-if="user.id === room.host" :players="players"></host>
      <player v-else :players="players" :user="currentUser" :room="room"></player>
    </div>

    <div class="fixed flex bottom-0 p-4 w-full">
      <div class="flex-auto"></div>
      <div class="text-right">
        <div v-if="visuals.showPlayers" class="mb-4">
          <div v-for="player in players" class="bg-white shadow rounded-full px-6 py-2 mb-2 w-max ml-auto">
            {{player.name}}
            <span v-if="room.host === player.id" class="text-sm text-gray-400">is <b>host</b></span>
            <span v-else-if="player.instrument === null" class="text-sm text-gray-400">is getting ready</span>
            <span v-else class="text-sm text-gray-400">is playing <b>{{player.instrument}}</b></span>
          </div>
        </div>

        <button class="my-auto uppercase font-bold italic text-sm align-middle tracking-widest text-white px-6 py-2 rounded-full shadow" :class="visuals.showPlayers ? 'bg-cambridgeBlue' : 'bg-verdigris'" @click="visuals.showPlayers = !visuals.showPlayers">
          players
          <span class="font-normal text-xs">{{players.length}}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Player from '../Player';

  export default {
    name: "Game",
    props: {
      room: Object,
      user: Object
    },
    data() {
      return {
        players: [],
        modules: [],
        currentUser: null,
        visuals: {
          showPlayers: false
        },

        connection: null,
        presence: null
      }
    },
    created() {
      let user = new Player(this.user);
      this.players.push(user);
      this.currentUser = this.players.length - 1;

      this.handleMultiplayer();
    },
    methods: {
      handleMultiplayer() {
        this.connection = Echo.private('room.'+this.room.key);

        this.presence = Echo.join('presence.'+this.room.key)
            .here((players) => {
              if(players.length > this.room.max_players) {
                this.connection.leave();
                this.presence.leave();
              } else {
                for (let i = 0; i < players.length; i++) {
                  if (players[i].id !== this.user.id) {
                    this.playerJoins(players[i]);
                  }
                }
              }
            }).joining((player) => {
              console.log(player);
              this.playerJoins(player);
            }).leaving((player) => {
              this.playerLeaves(player);
            });
      },
      playerJoins(player) {
        let tmp = new Player(player);
        this.players.push(tmp);
      },
      playerLeaves(player) {
        this.players.splice(this.players.indexOf(player), 1);
      },
      setInstrument(player = this.user.id, module) {
        let user = this.players.find(u => u.id === player);
        user.setInstrument(module);
      }
    }
  }
</script>

<style scoped>

</style>