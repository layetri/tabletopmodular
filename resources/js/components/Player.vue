<template>
  <div class="container mx-auto h-full">
    <div v-if="selectInstrumentRequirement" class="grid grid-cols-2 mt-36 md:mt-20">
      <div v-for="option in modules[room.synth_type]" class="text-center" @click="selectModule(option)">
        <span class="uppercase font-bold tracking-wide text-palePurple cursor-pointer">{{option}}</span>
      </div>
    </div>

    <div class="h-full flex flex-col place-content-center" v-else>
      <sequencer-module v-if="players[user].instrument.type === 'sequencer'"
          :instrument="players[user].instrument"
          :togglePatchbay="togglePatchbay"
          @patch="patch"
          @set-parameter="setParameter"
          @set-step="setStep">
      </sequencer-module>
      <generic-module v-else
          :instrument="players[user].instrument"
          :togglePatchbay="togglePatchbay"
          @patch="patch"
          @set-parameter="setParameter">
      </generic-module>

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
      players_ext: Array,
      user: Number,
    },
    data() {
      return {
        players: [],
        modules: {
          //ANALOG: ['voice', 'filter', 'envelope', 'LFO', 'sequencer', 'delay'],
          // Only select modules that are available in the prototype
          ANALOG: ['voice', 'filter', 'sequencer', 'delay'],
          HYBRID: ['voice', 'filter', 'controller', 'reverb', 'granular', 'delay']
        },
        parameterBlocking: false,
        blockingTimer: null,

        togglePatchbay: false,
        selectedConnector: null,
        cables: [],
        selectInstrumentRequirement: true
      }
    },
    created() {
      this.fillPlayerArray();
    },
    methods: {
      // Handle user selecting a module
      selectModule(instrument) {
        this.$emit('set-instrument', instrument);
      },

      // Open patchbay
      patch(jack, name) {
        this.selectedConnector = {name: name, connector: jack};
        this.togglePatchbay = true;
      },

      // Handle parameter setting change
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

      // Handle sequencer step setting change
      setStep(id) {
        // Throttle events because Pusher is expensive and LaravelEchoServer is a pain to set up
        if(this.parameterBlocking !== 'step-'+id) {
          clearTimeout(this.blockingTimer);

          this.connection.whisper('set-step', {
            player: this.players[this.user].id,
            step: id,
            value: this.players[this.user].instrument.steps[id].value
          });

          this.parameterBlocking = 'step-'+id;
          this.blockingTimer = setTimeout(() => {
            this.parameterBlocking = false;
          }, 100);
        }
      },

      // Connect two ports together
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
      },

      // Fill local player array to avoid mutating parent state
      fillPlayerArray() {
        if(this.players_ext !== this.players) {
          for (let i = 0; i < this.players_ext.length; i++) {
            if (this.players[i] === undefined && (this.players_ext[i].instrument !== null || this.players_ext[i].id === this.room.host)) {
              this.players[i] = _.clone(this.players_ext[i]);
              if (this.players_ext[i].isCurrentUser) this.selectInstrumentRequirement = false;
            }
          }
        }
      }
    },
    watch: {
      players_ext: {
        deep: true,
        handler: function() {
          this.fillPlayerArray();
        }
      }
    }
  }
</script>

<style scoped>

</style>