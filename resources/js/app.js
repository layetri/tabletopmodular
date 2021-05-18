require('./bootstrap');
import { createApp } from 'vue';
import VueMq from "vue3-mq";

import Container from './components/Container.vue';

const app = createApp(Container);

// Register our Vue components
app.component('Landing', require('./pages/Landing.vue').default);
app.component('Game', require('./pages/Game.vue').default);
app.component('Start', require('./pages/Start.vue').default);

app.component('Patchbay', require('./components/Patchbay.vue').default);

app.component('generic-module', require('./components/GenericModule.vue').default);
app.component('sequencer-module', require('./components/SequencerModule.vue').default);

app.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    sm: 640,
    md: 768,
    lg: Infinity,
  }
});

// Mount the Vue application
app.mount('#app');