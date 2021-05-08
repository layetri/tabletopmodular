<template>
  <div class="container mx-auto mt-20">
    <div v-if="players[user].instrument === null" class="grid grid-cols-2">
      <div v-for="option in modules[room.synth_type]" class="text-center">
        {{option}}
      </div>
    </div>
    <div v-else>
      control module
    </div>
  </div>
</template>

<script>
  export default {
    name: "Player",
    props: {
      room: Object,
      players: Array,
      user: Number
    },
    data() {
      return {
        modules: {
          ANALOG: ['voice', 'filter', 'envelope', 'LFO', 'sequencer', 'delay'],
          HYBRID: ['voice', 'filter', 'controller', 'reverb', 'granular', 'delay']
        }
      }
    },
    methods: {
      selectModule(module) {
        this.$emit('set-instrument', module);
      }
    }
  }
</script>

<style scoped>

</style>