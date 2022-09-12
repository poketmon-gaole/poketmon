import { createWebHashHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home'),
  },
  {
    path: '/series/:series',
    name: 'Series',
    component: () => import('@/views/home'),
  }
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});