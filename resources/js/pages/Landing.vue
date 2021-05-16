<template>
  <div class="container mx-auto p-4 mt-36 md:mt-20">
    <div class="w-full md:w-1/3 xl:w-1/4 rounded-xl bg-white bg-opacity-50 p-6 shadow-lg">
      <h3 class="text-2xl font-bold mb-4">Join a room</h3>

      <div class="mb-10">
        <small class="uppercase italic font-bold text-sm text-gray-500">Recent rooms</small>
        <p v-for="room in roomHistory" class="select-none cursor-pointer text-gray-400 font-bold mb-1" @click="$emit('join-room', room.key)">{{room.key}}</p>
      </div>

      <small class="uppercase italic font-bold text-gray-500">Room key</small><br>
      <div class="flex">
        <label class="flex-auto">
          <input type="text" class="bg-white bg-opacity-50 px-4 py-2 rounded-lg" placeholder="e.g. 1AB23C" v-model="key">
        </label>
        <button class="uppercase font-bold italic text-sm tracking-widest bg-lightCoral text-white px-6 py-2 rounded-full shadow" @click="joinRoom()">Join</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Landing",
    data() {
      return {
        roomHistory: [],
        key: null
      }
    },
    created() {
      axios.get('/rooms/history').then(res => {
        this.roomHistory = res.data;
      });
    },
    methods: {
      joinRoom() {
        this.$emit('join-room', this.key);
      }
    }
  }
</script>

<style scoped>

</style>