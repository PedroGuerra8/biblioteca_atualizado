import axios from 'axios';

// URL base do backend
const API_URL = 'http://localhost:5000/api/books'; // Altere para o endereço correto

// Função para listar todos os livros
export const getBooks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    throw error;
  }
};

// Função para criar um novo livro
export const createBook = async (bookData) => {
  try {
    const response = await axios.post(API_URL, bookData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar livro:', error);
    throw error;
  }
};

// Função para atualizar um livro
export const updateBook = async (bookId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${bookId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
    throw error;
  }
};

// Função para deletar um livro
export const deleteBook = async (bookId) => {
  try {
    const response = await axios.delete(`${API_URL}/${bookId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar livro:', error);
    throw error;
  }
};
