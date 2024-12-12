import axios from 'axios';

// URL base do backend (ajusta conforme necessário, usando variável de ambiente, por exemplo)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/books';

// Instância do Axios com configuração global
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 5000, // Tempo limite de 5 segundos para requisições
  headers: {
    'Content-Type': 'application/json',
  },
});

// Função para listar todos os livros
export const getBooks = async () => {
  try {
    const response = await apiClient.get('/');
    return response.data; // Retorna os dados recebidos do backend
  } catch (error) {
    handleError(error, 'Erro ao buscar livros');
    throw error;
  }
};

// Função para criar um novo livro
export const createBook = async (bookData) => {
  try {
    const response = await apiClient.post('/', bookData);
    return response.data; // Retorna o livro criado
  } catch (error) {
    handleError(error, 'Erro ao criar livro');
    throw error;
  }
};

// Função para atualizar um livro
export const updateBook = async (bookId, updatedData) => {
  try {
    const response = await apiClient.put(`/${bookId}`, updatedData);
    return response.data; // Retorna o livro atualizado
  } catch (error) {
    handleError(error, 'Erro ao atualizar livro');
    throw error;
  }
};

// Função para deletar um livro
export const deleteBook = async (bookId) => {
  try {
    const response = await apiClient.delete(`/${bookId}`);
    return response.data; // Retorna a confirmação da exclusão
  } catch (error) {
    handleError(error, 'Erro ao deletar livro');
    throw error;
  }
};

// Função auxiliar para tratar erros
const handleError = (error, message) => {
  if (error.response) {
    // Erros retornados pelo backend
    console.error(`${message}: ${error.response.data.message || error.response.statusText}`);
  } else if (error.request) {
    // Erros relacionados à falta de resposta do servidor
    console.error(`${message}: Sem resposta do servidor. Verifique sua conexão.`);
  } else {
    // Outros erros, como problemas na configuração do axios
    console.error(`${message}: ${error.message}`);
  }
};
