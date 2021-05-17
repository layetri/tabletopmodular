<template>
  <div class="w-4/5 md:w-1/3 p-8 mx-auto rounded-2xl shadow-lg" :class="'bg-'+instrument.color">
    <!-- A section for module information -->
    <!-- Future concept: add module manufacturer (when adding module store/API) -->
    <div class="text-center mb-4">
      <span class="uppercase tracking-widest font-bold text-gray-800 text-opacity-50 text-lg">{{instrument.type}}</span>
    </div>

    <!-- A grid for control knobs -->
    <div class="grid grid-cols-2" v-if="$mq !== 'sm' || !togglePatchbay">
      <div v-for="(parameter, name) in instrument.parameters" class="text-center p-4">

        <input
            type="range"
            :min="parameter.range[0]"
            :max="parameter.range[1]"
            :step="parameter.step"
            v-model="parameter.value"
            class="input-knob"
            :data-src="'/assets/knob.svg'"
            @input="setParameter(name)">
        <br>

        <span>{{name}}</span><br>
        <small>{{ parameter.display() }}</small>
      </div>
    </div>

    <!-- A grid for jack connectors -->
    <div class="grid" :class="Object.keys(instrument.connections).length > 2 ? 'grid-cols-3' : 'grid-cols-'+Object.keys(instrument.connections).length">
      <div v-for="(jack, name) in instrument.connections" class="p-2 px-auto">
        <div class="p-2 bg-gray-200 bg-opacity-50 rounded-lg w-full text-center"
          @click="patch(jack, name)">
          <img :src="'/assets/jack.svg'"
              class="w-10 h-auto mx-auto cursor-pointer"
              v-if="jack.connectedTo === null"
              alt="jack-unconnected">
          <img :src="'/assets/jack_'+jack.color+'.svg'"
              class="w-10 h-auto mx-auto"
              v-else
              alt="jack-connected">

          <small>
            <span class="text-red-500 font-bold text-xs" v-if="jack.type === 'cv'">cv</span>
            {{name}}
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GenericModule",
  props: {
    instrument: Object,
    togglePatchbay: Boolean
  },
  methods: {
    patch(jack, name) {
      this.$emit('patch', jack, name);
    },
    setParameter(name) {
      this.$emit('set-parameter', name);
    }
  }
}
</script>

<style scoped>

</style>