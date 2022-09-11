// Vuex 때 처럼 create* 함수를 제공한다.
import { createWebHashHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home'), // 동적 import
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