import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      theme: 'home',
      icon: '🏠'
    },
  },
  {
    path: '/fuvest',
    name: 'fuvest',
    component: () => import('../views/FuvestView.vue'),
    meta: {
      theme: 'blue',
      icon: '💧'
    },
  },
  {
    path: '/unicamp',
    name: 'unicamp',
    component: () => import('../views/UnicampView.vue'),
    meta: {
      theme: 'violet',
      icon: '🔮'
    },
  },
  {
    path: '/enem',
    name: 'enem',
    component: () => import('../views/EnemView.vue'),
    meta: {
      theme: 'green',
      icon: '🍃'
    },
  },
  {
    path: '/cacd',
    name: 'cacd',
    component: () => import('../views/CacdView.vue'),
    meta: {
      theme: 'gold',
      icon: '🌎'
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router