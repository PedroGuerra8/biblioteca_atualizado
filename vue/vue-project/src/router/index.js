import { createRouter, createWebHistory } from 'vue-router';

// Importações diretas dos componentes
import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import CriarPage from '../views/CriarPage.vue';
import CadastroLivroPage from '../views/CadastroLivroPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomePage, // Componente importado diretamente
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage, // Componente importado diretamente
    },
    {
      path: '/criar',
      name: 'criar',
      component: CriarPage, // Componente importado diretamente
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: CadastroLivroPage, // Componente importado diretamente
    },
    {
      path: '/',
      redirect: '/criar', // Redireciona para a página de criação de conta
    },
  ],
});

// Verifica se o usuário está autenticado antes de acessar páginas protegidas
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('authToken'); // Verifica se há token no localStorage

  // Se não estiver autenticado e tentar acessar uma página protegida, redireciona para a página de login
  if (to.name !== 'login' && to.name !== 'criar' && !isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;

