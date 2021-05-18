<template>
  <div class="h-full">
    <div v-if="!ready" class="w-full text-center mt-60">
      <button @click="handleAudioPermission()" class="my-auto uppercase font-bold italic text-sm align-middle tracking-widest text-white px-6 py-2 rounded-full shadow bg-verdigris">Allow audio playback</button>
    </div>

    <div v-else id="gameScreenContainer" class="h-full">
      <host v-if="user.id === room.host" :user="currentUser" :players="players"></host>
      <client v-else :players="players" :user="currentUser" :room="room" :connection="connection" @set-instrument="setInstrument"></client>
    </div>

    <div class="fixed w-full bottom-0">
      <div class="flex w-full p-4 pb-0">
        <div class="flex-auto"></div>
        <div class="text-right">
          <div id="popupArea">
            <div v-for="popup in popups" class="bg-paleSpringBud shadow rounded-full px-6 py-2 mb-2 w-max ml-auto">
              <b>{{ popup.name }}</b> {{ popup.message }}
            </div>
          </div>

          <div v-if="visuals.showPlayers" class="">
            <div v-for="player in players" class="bg-white shadow rounded-full px-6 py-2 mb-2 w-max ml-auto">
              {{player.name}}
              <span v-if="room.host === player.id" class="text-sm text-gray-400">
              is <b>host</b>
            </span>
              <span v-else-if="player.instrument === null" class="text-sm text-gray-400">
              is getting ready
            </span>
              <span v-else class="text-sm text-gray-400">
              is playing <b>{{player.instrument.type}}</b>
            </span>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full flex p-4">
        <div class="flex-auto"></div>

        <div>
          <button v-if="DEVMODE" class="mr-4 my-auto uppercase font-bold italic text-sm align-middle tracking-widest text-white px-6 py-2 rounded-full shadow bg-red-500" @click="createTestPlayer()">
            create test player
          </button>

          <button class="mr-4 my-auto uppercase font-bold italic text-sm align-middle tracking-widest text-white px-6 py-2 rounded-full shadow" :class="config.localAudio ? 'bg-cambridgeBlue' : 'bg-lightCoral'" @click="toggleAudio()">
            <span v-if="config.localAudio">Audio is <b>on</b></span>
            <span v-else>Audio is <b>off</b></span>
          </button>

          <button class="my-auto uppercase font-bold italic text-sm align-middle tracking-widest text-white px-6 py-2 rounded-full shadow" :class="visuals.showPlayers ? 'bg-cambridgeBlue' : 'bg-verdigris'" @click="visuals.showPlayers = !visuals.showPlayers">
            players
            <span class="font-normal text-xs">{{players.length}}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import host from '../components/Host';
  import client from '../components/Player';

  import Player from '../Player';

  export default {
    name: "Game",
    components: {
      client,
      host
    },
    props: {
      room: Object,
      user: Object
    },
    data() {
      return {
        DEVMODE: false,
        players: [],
        modules: [],
        currentUser: null,
        popups: [],
        ready: false,

        visuals: {
          showPlayers: false
        },
        config: {
          localAudio: false
        },

        connection: null,
        presence: null,
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
        // Connect to Echo private channel
        this.connection = Echo.private('room.'+this.room.key);

        // Connect to Echo presence channel
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
              this.notify('joined the game', player.name);
              this.playerJoins(player);

              if(this.user.id === this.room.host) {
                this.connection.whisper('welcome-player', {
                  players: this.players
                });
              }
            }).leaving((player) => {
              this.notify('left the game', player.name);
              this.playerLeaves(player);
            });

        // TODO: HANDLE PLAYER JOINING
        // Handle runtime information about players
        this.connection.listenForWhisper('welcome-player', (players) => {
          for(let i = 0; i < this.players.length; i++) {
            let player = players.find(u => u.id = this.players[i].id);
            console.log(players);
            if(player.instrument !== null) {
              this.players[i].setInstrument(player.instrument.type);
            }
          }
        });

        // Handle instrument change
        this.connection.listenForWhisper('set-instrument', ({instrument, player}) => {
          let user = this.findUser(player);
          user.setInstrument(instrument, player);
          // Update the UI
          this.notify('is now playing '+instrument, user.name);
        });

        // Handle parameter change
        this.connection.listenForWhisper('set-parameter', ({player, parameter, value}) => {
          this.findUser(player).instrument.setParameter(parameter, value);
        });

        // Handle patch connection change
        this.connection.listenForWhisper('patch', ({source, destination}) => {
          const src = this.findUser(source.user).instrument.connections[source.port];
          if(destination.port !== 'globalConnector') {
            const dest = this.findUser(destination.user).instrument.connections[destination.port];

            src.patch(dest.getNode());
          } else {
            src.patch(Tone.getDestination());
          }
        });
      },

      // Utility function: find user by id
      findUser(id) {
        return this.players.find(u => u.id === id);
      },

      // Notify the UI
      notify(message, user) {
        this.popups.push({message: message, name: user});
        setTimeout(() => {
          this.popups.shift();
        }, 5000);
      },

      // Handle players joining the room
      playerJoins(player) {
        this.players.push(new Player(player));
      },

      // Handle players leaving the room
      playerLeaves(player) {
        let u = this.findUser(player.id);

        if(u.instrument !== null) {
          u.instrument.destroy();
        }
        this.players.splice(this.players.indexOf(player), 1);
      },

      // Assign an instrument to a given player
      setInstrument(instrument, player = this.user.id) {
        this.players.find(u => u.id === player).setInstrument(instrument);

        if(player === this.user.id) {
          this.connection.whisper('set-instrument', {
            instrument: instrument,
            player: this.user.id
          });
        }
      },

      // Create a player for testing purposes
      createTestPlayer() {
        let id = this.players.length + 1000;
        this.players.push(new Player({name: 'tester', id: id}));
        let test_user = this.findUser(id);

        let dest;
        if(this.players[this.currentUser].instrument && this.players[this.currentUser].instrument.connections.input) {
          dest = this.players[this.currentUser].instrument.connections.input.getNode();
        } else {
          dest = Tone.getDestination();
        }
        test_user.setInstrument('voice');
        test_user.instrument.connections.output.patch(dest);
      },

      // Toggle local audio playback on/off
      toggleAudio() {
        this.config.localAudio = !this.config.localAudio;
        Tone.Destination.mute = !this.config.localAudio;
      },

      // Handle audio permissions and setup audio
      async handleAudioPermission() {
        await Tone.start();
        this.ready = true;
        if(this.user.id !== this.room.host) {
          Tone.Destination.mute = true;
          this.config.localAudio = false;
        } else {
          this.config.localAudio = true;
        }
      },
    }
  }
</script>

<style scoped>

</style>