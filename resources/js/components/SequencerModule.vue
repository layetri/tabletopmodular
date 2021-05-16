<template>
  <div class="w-2/3 mx-auto p-8 rounded-2xl shadow-lg" :class="'bg-'+instrument.color">
    <!-- A section for module information -->
    <!-- Future concept: add module manufacturer (when adding module store/API) -->
    <div class="text-center mb-4">
      <span class="uppercase tracking-widest font-bold text-gray-100 text-opacity-50 text-lg">{{instrument.type}}</span>
    </div>

    <div class="flex w-3/4">
      <div class="flex-auto p-4 text-center" v-for="step in instrument.steps">
        <div>
          <img :src="'/assets/led_on.svg'" v-if="instrument.currentStep === step.order" alt="">
          <img :src="'/assets/led_off.svg'" v-else alt="">
        </div>

        <div @click="step.toggle()" class="mb-6">
          <img :src="'/assets/switch_on.svg'" v-if="step.state" alt="">
          <img :src="'/assets/switch_off.svg'" v-else alt="">
        </div>

        <div>
          <input
              type="range"
              min="0"
              max="100"
              step="1"
              v-model="step.value"
              class="input-knob"
              data-diameter="50"
              @change="setParameter(name)">
        </div>
      </div>
    </div>

    <div class="w-1/4">
      <div @click="instrument.toggle()" class="mb-6">
        <img :src="'/assets/switch_on.svg'" v-if="instrument.state" alt="">
        <img :src="'/assets/switch_off.svg'" v-else alt="">
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
          <img :src="'/assets/jack.svg'"
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
    name: "SequencerModule",
    props: {
      instrument: Object
    },
    methods: {
      setParameter(name) {

      },
      patch(jack, name) {
        this.$emit('patch', jack, name);
      }
    }
  }
</script>

<style scoped>

</style>