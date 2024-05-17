import { createRouter, createMemoryHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: HomeView
    },
    {
      name: 'music',
      path: '/music',
      props: true,
      component: () => import('../views/MusicView.vue'),
    },
    {
      name: 'musicitem',
      path: '/music/:item',
      props: true,
      meta: { hidden: true },
      component: () => import('../views/MusicView.vue'),
    },
    {
      name: 'live',
      path: '/live',
      component: () => import('../views/LiveView.vue'),
    },
    {
      name: 'photos',
      path: '/photos',
      meta: { hidden: true },
      component: () => import('../views/PhotosView.vue'),
    },
    {
      name: 'photoitem',
      path: '/photos/:item',
      props: true,
      meta: { hidden: true },
      component: () => import('../views/PhotosView.vue'),
    },
    {
      name: 'videos',
      path: '/videos',
      component: () => import('../views/VideosView.vue'),
    },
    {
      name: 'videoitem',
      path: '/videos/:item',
      props: true,
      meta: { hidden: true },
      component: () => import('../views/VideosView.vue'),
    },
    {
      name: 'about',
      path: '/about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: `/:pathMatch(.*)*`,
      component: HomeView,
      meta: { hidden: true },
    },
  ],
});

export default router;
