<template>
  <div class="container mx-auto p-4 mt-16">
    <div class="w-1/4 rounded-xl bg-white bg-opacity-50 p-6 shadow-lg">
      <h3 class="text-2xl font-bold mb-4">Join a room</h3>

      <div>
        <p v-for="room in roomHistory" class="select-none cursor-pointer text-gray-400 font-bold mb-3" @click="$emit('join-room', room.key)">{{room.key}}</p>
      </div>

      <input type="text" v-model="key">
      <button class="uppercase font-bold italic text-sm tracking-widest bg-lightCoral text-white px-6 py-2 rounded-full shadow" @click="joinRoom()">Join</button>
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