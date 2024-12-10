<template>
    <div>
      <h2>Livros</h2>
      <ul>
        <li v-for="book in books" :key="book._id">
          <p><strong>{{ book.title }}</strong></p>
          <p>{{ book.author }} ({{ book.year }})</p>
          <img v-if="book.image" :src="book.image" alt="Book Image" width="100" />
          <button @click="editBook(book._id)">Editar</button>
          <button @click="deleteBook(book._id)">Deletar</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { getBooks, deleteBook } from '../api/booksApi';
  
  export default {
    data() {
      return {
        books: [],
      };
    },
    created() {
      this.fetchBooks();
    },
    methods: {
      async fetchBooks() {
        try {
          this.books = await getBooks();
        } catch (error) {
          alert('Erro ao buscar livros');
        }
      },
      async deleteBook(bookId) {
        try {
          await deleteBook(bookId);
          alert('Livro deletado');
          this.fetchBooks(); // Recarrega a lista após a exclusão
        } catch (error) {
          alert('Erro ao deletar livro');
        }
      },
      editBook(bookId) {
        this.$router.push({ name: 'editar-livro', params: { id: bookId } });
      },
    },
  };
  </script>
  