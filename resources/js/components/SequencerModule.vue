<template>
  <div class="w-5/6 xl:w-2/3 mx-auto p-8 rounded-2xl shadow-lg" :class="'bg-'+instrument.color">
    <!-- A section for module information -->
    <!-- Future concept: add module manufacturer (when adding module store/API) -->
    <div class="text-center mb-4">
      <span class="uppercase tracking-widest font-bold text-gray-800 text-opacity-50 text-lg">{{instrument.type}}</span>
    </div>

    <div class="flex flex-col lg:flex-row inline-flex w-full">
      <div class="flex inline-flex flex-grow-0 w-3/4">
        <div class="flex-auto p-4 text-center" v-for="step in instrument.steps">
          <div>
            <img :src="'/assets/led_on.svg'" v-if="instrument.currentStep === step.order" alt="">
            <img :src="'/assets/led_off.svg'" v-else alt="">
          </div>

          <div @click="step.toggle()" class="mb-6">
            <img :src="'/assets/switch_on.svg'" class="w-12 mx-auto" v-if="step.state" alt="">
            <img :src="'/assets/switch_off.svg'" class="w-12 mx-auto" v-else alt="">
          </div>

          <div>
            <input type="range"
                min="-500"
                max="500"
                step="5"
                v-model="step.value"
                class="input-knob"
                data-diameter="45"
                :data-src="'/assets/knob.svg'"
                @change="setParameter(name)">
          </div>
        </div>
      </div>

      <div class="flex-grow-0 w-1/4 p-4 text-center">
        <div class="mb-6">
          <div @click="instrument.toggle()" class="cursor-pointer">
            <img :src="'/assets/switch_on.svg'" class="w-12 mx-auto" v-if="instrument.state" alt="">
            <img :src="'/assets/switch_off.svg'" class="w-12 mx-auto" v-else alt="">
          </div>
          <small>run/stop</small>
        </div>

        <div v-for="(param, name) in instrument.parameters">
          <input type="range"
              :min="param.range[0]"
              :max="param.range[1]"
              :step="param.step"
              v-model="param.value"
              class="input-knob"
              data-diameter="45"
              :data-src="'/assets/knob.svg'"
              @input="setParameter(name)">
          <br>

          <small>{{name}}</small>
        </div>
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
    name: "SequencerModule",
    props: {
      instrument: Object
    },
    methods: {
      // Emits the set parameter event
      setParameter(name) {
        this.$emit('set-parameter', name);
      },

      // Emits the patch event
      patch(jack, name) {
        this.$emit('patch', jack, name);
      }
    }
  }
</script>

<style scoped>

</style>