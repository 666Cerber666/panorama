import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Contacts from './pages/Contacts.vue';
import Product from './pages/Product.vue';
import Home from './pages/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/Contacts',
    name: 'О нас',
    component: Contacts,
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,
  },

  {
    path: '/',
    name: 'Главная',
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router;

