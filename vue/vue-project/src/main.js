import { createApp } from 'vue';  // Importação correta do Vue 3
import App from './App.vue';
import router from './router';
import api from './axios';  // Certifique-se de que o axios está sendo exportado corretamente

// Criando a aplicação Vue
const app = createApp(App);

// Configurando o Axios globalmente
app.config.globalProperties.$http = api;  // Axios global

// Usando o roteador
app.use(router);

createApp(App)
  .use(router) // Certifique-se de que o Vue Router está sendo usado
  .mount('#app');