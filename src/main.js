import '@/assets/main.css';

import { createApp } from 'vue';
import VueDayjs from 'vue3-dayjs-plugin'

import App from './App.vue';
import router from './router';

import MorvAlbum from './components/MorvAlbum.vue';
import MorvAlbumEmbed from './components/MorvAlbumEmbed.vue';
import MorvIcons from './components/MorvIcons.vue';
import MorvLive from './components/MorvLive.vue';
import MorvOverlay from './components/MorvOverlay.vue';
import MorvVideo from './components/MorvVideo.vue';

import JsonData from '@/components/JsonData.vue';

const app = createApp(App);

app.use(router);
app.use(VueDayjs);

app.mixin(JsonData);

app
  .component('MorvAlbum', MorvAlbum)
  .component('MorvAlbumEmbed', MorvAlbumEmbed)
  .component('MorvIcons', MorvIcons)
  .component('MorvLive', MorvLive)
  .component('MorvOverlay', MorvOverlay)
  .component('MorvVideo', MorvVideo);

app.mount('#app');
