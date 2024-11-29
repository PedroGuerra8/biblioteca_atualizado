import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginPage.vue'),
    },
    {
      path: '/criar',
      name: 'criar',
      component: () => import('../views/CriarPage.vue'),
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: () => import('../views/CadastroLivroPage.vue'),
    },
  ],
})

export default router
