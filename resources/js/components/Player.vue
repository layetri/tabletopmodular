<template>
  <div class="container mx-auto mt-36 md:mt-20">
    <div v-if="players[user].instrument === null" class="grid grid-cols-2">
      <div v-for="option in modules[room.synth_type]" class="text-center" @click="selectModule(option)">
        <span class="uppercase font-bold tracking-wide text-palePurple cursor-pointer">{{option}}</span>
      </div>
    </div>

    <div v-else>
      <sequencer-module v-if="players[user].instrument.type === 'sequencer'" :instrument="players[user].instrument" :togglePatchbay="togglePatchbay" @patch="patch" @set-parameter="setParameter"></sequencer-module>
      <generic-module v-else :instrument="players[user].instrument" :togglePatchbay="togglePatchbay" @patch="patch" @set-parameter="setParameter"></generic-module>

      <patchbay :players="players" :player="players[user]" :jack="selectedConnector" v-if="togglePatchbay" @patch="makeConnection"></patchbay>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Player",
    props: {
      room: Object,
      connection: Object,
      players: Array,
      user: Number,
    },
    data() {
      return {
        modules: {
          ANALOG: ['voice', 'filter', 'envelope', 'LFO', 'sequencer', 'delay'],
          HYBRID: ['voice', 'filter', 'controller', 'reverb', 'granular', 'delay']
        },
        parameterBlocking: false,
        blockingTimer: null,

        togglePatchbay: false,
        selectedConnector: null,
        cables: []
      }
    },
    methods: {
      selectModule(instrument) {
        this.$emit('set-instrument', instrument);
      },
      patch(jack, name) {
        this.selectedConnector = {name: name, connector: jack};
        this.togglePatchbay = true;
      },
      setParameter(name) {
        this.players[this.user].instrument.parameters[name].handler();

        // Throttle events because Pusher is expensive and LaravelEchoServer is a pain to set up
        if(this.parameterBlocking !== name) {
          clearTimeout(this.blockingTimer);

          this.connection.whisper('set-parameter', {
            player: this.players[this.user].id,
            parameter: name,
            value: this.players[this.user].instrument.parameters[name].value
          });

          this.parameterBlocking = name;
          this.blockingTimer = setTimeout(() => {
            this.parameterBlocking = false;
          }, 100);
        }
      },
      makeConnection({sourcePort, destination, destinationPort}) {
        let user = null;
        if(destinationPort !== 'globalConnector') {
          user = destination.user;
        }
        this.togglePatchbay = false;

        this.connection.whisper('patch', {
          source: {user: this.players[this.user].id, port: sourcePort},
          destination: {user: user, port: destinationPort}
        });
      }
    }
  }
</script>

<style scoped>

</style>