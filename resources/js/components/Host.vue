<template>
  <div class="flex h-full w-full" id="host_container">
    <div class="flex-auto"></div>
    <div class="flex-auto">
      <div class="grid grid-rows-2">
        <div v-for="player in modules" class="p-6 absolute" :class="'bg-'+player.instrument.color">
          {{player.name}}
        </div>
      </div>

      <img id="img_plant" :src="'/assets/plant.svg'" alt="">
    </div>
    <div class="flex-auto"></div>
  </div>
</template>

<script>
  export default {
    name: "Host",
    props: {
      user: Number,
      players: Array
    },
    computed: {
      modules() {
        return this.players.filter(p => {
          return p.id !== this.user && p.instrument !== null;
        });
      }
    }
  }
</script>

<style scoped>
  #img_plant {
    /*transform-origin: center;*/
    transform: translateY(53vh) translateX(-24rem);
    width: 20vw;
    height: auto;
    position: absolute;
    z-index: 10;
  }

  #host_container {
    height: 100vh;
    background-image: url('../../../public/assets/case.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>