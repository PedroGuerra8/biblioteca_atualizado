<template>
    <div>
      <h2>Editar Livro</h2>
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
        <button type="submit">Atualizar Livro</button>
      </form>
    </div>
  </template>
  
  <script>
  import { getBooks, updateBook } from '../../api/booksApi';
  
  export default {
    data() {
      return {
        title: '',
        author: '',
        year: '',
        image: '',
        bookId: this.$route.params.id, // Pega o ID do livro a ser editado
      };
    },
    created() {
      this.fetchBookDetails();
    },
    methods: {
      async fetchBookDetails() {
        try {
          const books = await getBooks();
          const book = books.find((b) => b._id === this.bookId);
          if (book) {
            this.title = book.title;
            this.author = book.author;
            this.year = book.year;
            this.image = book.image;
          }
        } catch (error) {
          alert('Erro ao buscar detalhes do livro');
        }
      },
      async submitForm() {
        const updatedData = {
          title: this.title,
          author: this.author,
          year: this.year,
          image: this.image,
        };
        console.log(updatedData);
        
        try {
          // await updateBook(this.bookId, updatedData);
          alert('Livro atualizado com sucesso!');
          // rthis.$router.push({ name: 'home' }); // Redireciona após sucesso
          
        } catch (error) {
          alert('Erro ao atualizar livro');
        }
      },
    },
  };
  </script>
  