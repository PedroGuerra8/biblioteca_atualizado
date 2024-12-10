<template>
    <div>
      <h2>Cadastrar Livro</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="title">Título:</label>
          <input type="text" v-model="title" id="title" required />
        </div>
        <div>
          <label for="author">Autor:</label>
          <input type="text" v-model="author" id="author" required />
        </div>
        <div>
          <label for="year">Ano:</label>
          <input type="number" v-model="year" id="year" required />
        </div>
        <div>
          <label for="image">Imagem (URL):</label>
          <input type="text" v-model="image" id="image" />
        </div>
        <button type="submit">Cadastrar Livro</button>
      </form>
    </div>
  </template>
  
  <script>
  import { createBook } from '../api/booksApi';
  
  export default {
    data() {
      return {
        title: '',
        author: '',
        year: '',
        image: '',
      };
    },
    methods: {
      async submitForm() {
        try {
          const bookData = {
            title: this.title,
            author: this.author,
            year: this.year,
            image: this.image,
          };
          const response = await createBook(bookData);
          alert('Livro criado com sucesso!');
          this.clearForm();
        } catch (error) {
          alert('Erro ao criar livro');
        }
      },
      clearForm() {
        this.title = '';
        this.author = '';
        this.year = '';
        this.image = '';
      },
    },
  };
  </script>
  