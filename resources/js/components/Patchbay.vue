<template>
  <div class="p-4 bg-white bg-opacity-50 rounded-xl shadow mt-10 w-1/2 mx-auto">
    <h4 class="uppercase font-bold italic tracking-wide mb-4">Destinations</h4>

    <div class="flex flex-row">
      <div class="w-min" v-for="(instrument, type) in connections">
        <span class="uppercase font-bold text-sm tracking-wide text-gray-400">
          {{type}}
        </span><br>

        <div v-for="(connector, name) in instrument"
             class="p-4 bg-gray-300 bg-opacity-70 rounded-lg w-max text-center mr-6"
             @click="patch(jack.connector, jack.name, connector, name)">
          <img :src="'/assets/jack.svg'"
               class="w-10 h-auto mx-auto cursor-pointer mb-4"
               alt="">

          <small>{{name}}</small>
        </div>
      </div>

      <div v-if="jack.connector.type === 'audio' && jack.connector.direction === 'output'">
        <span class="uppercase font-bold text-sm tracking-wide text-gray-400">
          global
        </span><br>
        <div class="p-4 bg-gray-300 bg-opacity-70 rounded-lg w-max text-center"
             @click="patch(jack.connector, jack.name, globalConnector, 'globalConnector')">
          <img :src="'/assets/jack.svg'"
               class="w-10 h-auto mx-auto cursor-pointer mb-4"
               alt="">

          <small>output</small>
        </div>
      </div>

      <div class="flex-auto"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Patchbay",
    props: {
      players: Array,
      player: Object,
      jack: Object
    },
    data() {
      return {
        globalConnector: {
          getNode: () => {return Tone.getDestination()}
        }
      }
    },
    methods: {
      patch(source, sourcePort, destination, destinationPort) {
        source.patch(destination.getNode());

        this.$emit('patch', {sourcePort, destination, destinationPort});
      },
    },
    computed: {
      modules() {
        let arr = [];
        for(let i = 0; i < this.players.length; i++) {
          if(this.players[i].instrument !== null && this.players[i] !== this.player) {
            arr.push({instrument: this.players[i].instrument, user: this.players[i].id});
          }
        }

        return arr;
      },
      connections() {
        let arr = {};
        for(let i = 0; i < this.modules.length; i++) {
          let cons = {};
          for(let c in this.modules[i].instrument.connections) {
            let con = this.modules[i].instrument.connections[c];
            if(con.type === this.jack.connector.type && con.direction !== this.jack.connector.direction) {
              con['user'] = this.modules[i].user;
              cons[c] = con;
            }
          }
          if(Object.keys(cons).length > 0 && this.modules[i].instrument.type !== undefined) {
            arr[this.modules[i].instrument.type] = cons;
          }
        }
        return arr;
      },
      cvConnections() {
        let arr = [];
        for(let i = 0; i < this.modules.length; i++) {
          for(let j = 0; j < this.modules[i].connections.length; j++) {
            let connection = this.modules[i].connections[j];
            if(connection.type === this.connection.type && connection.direction !== this.connection.direction) {
              arr.push(connection);
            }
          }
        }
        return arr;
      }
    }
  }
</script>

<style scoped>

</style>