<template>
  <div class="flex h-full w-full" id="host_container">
    <div id="moduleGrid" class="mx-auto grid grid-rows-2 grid-flow-col">
      <div v-for="player in modules" class="text-center module p-2" :class="['bg-'+player.instrument.color]">
        <span class="italic font-bold text-gray-800 tracking-wide">{{player.instrument.type}}</span><br>
        <small class="italic font-bold text-gray-500 tracking-wide">{{player.name}}</small>
      </div>
    </div>

    <img id="img_plant" :src="'/assets/plant.svg'" alt="">
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
    transform: translateY(53vh) translateX(4rem);
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

  #moduleGrid {
    width: 54vw;
    bottom: calc(50vh - 18vw);
    margin-left: 23vw;
    position: absolute;
  }

  .module {
    width: 6vw;
    height: 18vw;
  }
</style>