<template>
  <div class="mt-48 p-4">
    <div v-if="step === 0" class="text-center">
      <h2 class="font-bold text-white tracking-wider text-2xl mb-8">how many people can join?</h2>
      <input type="number" min="0" max="10" class="text-9xl w-64 font-black text-white bg-transparent text-center" placeholder="0" v-model="settings.players" @keypress.enter="step++">
    </div>

    <div v-if="step === 1" class="text-center">
      <h2 class="font-bold text-white tracking-wider text-2xl mb-8">what kind of synth do you want to play?</h2>

      <div class="flex flex-row w-full md:w-1/2 mx-auto">
        <div v-for="(synth, key) in synths" class="flex-auto p-2">
          <h4 @click="settings.synth = key; step++; $emit('create-game', settings)" class="text-2xl font-bold tracking-wide uppercase cursor-pointer" :class="settings.synth === key ? 'text-darkCoral' : 'text-mountbattenPink'">{{synth.name}}</h4>
          <small class="uppercase tracking-wide text-gray-200">{{synth.description}}</small>
        </div>
      </div>
    </div>

    <div v-if="step === 2" class="text-center">
      <h2 class="font-bold text-white tracking-wider text-2xl mb-8">all set! your code is:</h2>
      <h1 class="text-9xl text-lightCoral font-bold mb-28 filter drop-shadow-md">{{settings.code}}</h1>

      <button class="my-auto uppercase font-bold italic text-xl tracking-widest bg-verdigris text-white px-6 py-2 rounded-full shadow" @click="$emit('start-game')">start</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Start",
    data() {
      return {
        step: 0,
        synths: {
          ANALOG: {name: 'analog', description: 'voice, filter, envelope, LFO, sequencer, delay'},
          HYBRID: {name: 'hybrid', description: 'voice, filter, controller, reverb, granular, delay'}
        },
        settings: {
          players: null,
          synth: null,
          code: null,
        }
      }
    },
    created() {
      axios.get('/generate-key').then(res => {
        this.settings.code = res.data;
      });
    },
  }
</script>

<style scoped></style>