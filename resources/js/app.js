require('./bootstrap');
import Vue from 'vue'

//Main pages
Vue.component('Container', require('.//components/Container.vue').default);
Vue.component('Landing', require('.//pages/Landing.vue').default);
Vue.component('Game', require('.//pages/Game.vue').default);
Vue.component('Start', require('.//pages/Start.vue').default);

Vue.component('Host', require('.//components/Host.vue').default);
Vue.component('Player', require('.//components/Player.vue').default);


const app = new Vue({
  el: '#app'
});