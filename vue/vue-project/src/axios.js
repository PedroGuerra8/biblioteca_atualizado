import axios from 'axios'

// Configuração básica do Axios 
const api = axios.create({
    baseURL: 'http://localhost:4000/api', // URL base da API
});


// Interceptor para adicionar o token JWT em cada requisição, caso exista
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
})

export default api;