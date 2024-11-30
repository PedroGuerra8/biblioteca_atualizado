import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/login',
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
    // Redireciona a rota inicial "/" para a página de criação de conta "/criar"
    {
      path: '/',
      redirect: '/criar',
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Verifica se há um token

  if (to.name !== 'login' && to.name !== 'criar' && !isAuthenticated) {
    // Se não estiver autenticado e tentando acessar uma página protegida, redireciona
    next({ name: 'login' });
  } else {
    next(); // Permite o acesso
  }
});


export default router;
