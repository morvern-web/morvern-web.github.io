import { createRouter, createWebHistory, createWebHashHistory, createMemoryHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/music',
      name: 'music',
      component: () => import('../views/MusicView.vue'),
    },
    {
      path: '/live',
      name: 'live',
      component: () => import('../views/LiveView.vue'),
    },
    {
      path: '/photos',
      name: 'photos',
      meta: { hidden: true },
      component: () => import('../views/PhotosView.vue'),
    },
    {
      path: '/videos',
      name: 'videos',
      component: () => import('../views/VideosView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
});

export default router;
