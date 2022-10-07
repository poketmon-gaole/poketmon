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
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/components/search'),
    props: true
  },
  {
    path: '/guide/:type/:atckStts',
    name: 'Guide',
    component: () => import('@/components/guide'),
    props: true
  }  
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});