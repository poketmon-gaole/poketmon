// Vuex 때 처럼 create* 함수를 제공한다.
import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home'), // 동적 import
  },
  {
    path: '/login/:series',
    name: 'Login',
    component: () => import('@/views/login'),
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});