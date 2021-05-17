<template>
  <div class="m-0 h-full">
    <div class="fixed top-0 w-full align-middle p-4">
      <div class="container mx-auto flex">
        <div class="flex-auto">
          <h1 class="text-5xl text-white font-bold italic filter drop-shadow-md">Tabletop Modular</h1>
        </div>
        <button v-if="state === states.LANDING" @click="initGameCreator()" class="my-auto uppercase font-bold italic text-sm tracking-widest bg-verdigris text-white px-6 py-2 rounded-full shadow">Create a room</button>
        <span v-else-if="user != null" class="my-auto font-bold italic text-md w-max">{{user.name}}</span>
      </div>
    </div>

    <div class="h-full">
      <landing class="mt-36 md:mt-20" v-if="state === states.LANDING" @join-room="joinGame"></landing>
      <start class="mt-36 md:mt-20" v-else-if="state === states.START" @create-game="createGame" @join-room="joinGame"></start>
      <game v-else-if="state === states.GAME" :user="user" :room="room"></game>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Container",
    data() {
      return {
        states: {LANDING: 0, START: 1, GAME: 2},
        state: null,
        user: null,
        created: false,
        room: null,
      }
    },
    created() {
      this.state = this.states.LANDING;
    },
    methods: {
      switchState(state) {
        this.state = state;
      },
      createGame(settings) {
        axios.post('/rooms/create', {
          code: settings.code,
          max_players: settings.players,
          synth: settings.synth
        }).then(res => {
          this.fetchRoom(settings.code);
          this.created = true;
        });
      },
      joinGame(room = null) {
        this.createUser(() => {
          if(room != null) {
            this.fetchRoom(room, () => {
              this.state = this.states.GAME;
            });
          }
        });
      },
      fetchRoom(key, callback = null) {
        axios.get('/rooms/open/'+key).then(res => {
          this.room = res.data;
          if(callback !== null) callback();
        });
      },
      createUser(callback) {
        // Create a new user or retrieve an existing one
        axios.get('/generate-user').then(res => {
          this.user = res.data;
          callback();
        });
      },
      initGameCreator() {
        this.createUser(() => {
          this.state = this.states.START;
        });
      }
    }
  }
</script>

<style scoped>

</style>