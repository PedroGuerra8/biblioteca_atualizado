<template>
  <header>
     <h1>Library Manage</h1>
  </header>
  <div class="container">
    <aside class="sidebar">
      <h2>Menu</h2>
      <ul>
        <li><router-link to="/home" class="opcao-menu">Home</router-link></li>
        <li><router-link to="/login" class="opcao-menu">Login</router-link></li>
        <li><router-link to="/criar" class="opcao-menu">Criar</router-link></li>
        <li><router-link to="/cadastro-livro" class="opcao-menu">Cadastro de Livros</router-link></li>
        <li><router-link to="/dash" class="opcao-menu">Dashboard</router-link></li>
      </ul>
    </aside>
    <main>
      <section class="book-list">
        <!-- Barra de pesquisa -->
        <div class="search-container">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Pesquisar livros pelo nome..."
            class="search-bar"
          />
        </div>

        <div class="books">
          <div class="book"
            v-for="book in filteredBooks"
            :key="book.title">
            <img :src="book.image" :alt="book.title" />
            <h3>{{ book.title }}</h3>
            <p>Autor: {{ book.author }}</p>
            <p>Descrição breve sobre o livro.</p>

            <!-- Botões para reservar ou devolver o livro -->
            <button v-if="!book.reserved" @click="reserveBook(book)">
              Reservar
            </button>
            <button v-if="book.reserved" @click="returnBook(book)">
              Devolver
            </button>
            <p v-if="book.reserved" class="reserved-message">Este livro está reservado.</p>
          </div>
        </div>
      </section>  
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '', // Texto digitado na barra de pesquisa
      books: [
        {
          title: 'Café com Deus Pai',
          author: 'Júnior Rostirola',
          image: '../assets/img/café_com_Deus_Pai.png',
          description: 'Livro sobre a vida de Deus Pai',
          reserved: false, // Estado de reserva
        },
        {
          title: 'A Mente Moralista',
          author: 'Jonathan Haidt',
          image: '../assets/img/a_mente_moralista.png',
          reserved: false, // Estado de reserva
        },
        {
          title: 'O Pequeno Príncipe',
          author: 'Antoine de Saint-Exupéry',
          image: '../assets/img/o_pequeno_principe.png',
          reserved: false, // Estado de reserva
        },
        {
          title: 'Os Segredos da Mente Milionária',
          author: 'T. Harv Eker',
          image: '../assets/img/os_segredos_da_mente_milionaria.png',
          reserved: false, // Estado de reserva
        },
        {
          title: 'Hábitos Atômicos',
          author: 'James Clear',
          image: '../assets/img/habitos_atomicos.png',
          reserved: false, // Estado de reserva
        },
        {
          title: 'O Homem mais Rico da Babilônia',
          author: 'George S. Clason',
          image: '../assets/img/o_homem_mais_rico_da_babilonia.png',
          reserved: false, // Estado de reserva
        },
        {
          title: 'O Poder do Hábito',
          author: 'Charles Duhigg',
          image: '../assets/img/o_poder_do_habito.png',
          reserved: false, // Estado de reserva
        },
      ],
    };
  },
  computed: {
    filteredBooks() {
      // Filtra os livros com base no texto da barra de pesquisa
      return this.books.filter((book) =>
        book.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    // Função para reservar o livro
    reserveBook(book) {
      book.reserved = true; // Marca o livro como reservado
      alert(`O livro "${book.title}" foi reservado com sucesso!`);
    },
    // Função para devolver o livro
    returnBook(book) {
      book.reserved = false; // Marca o livro como disponível novamente
      alert(`O livro "${book.title}" foi devolvido com sucesso!`);
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header { 
  background: #09a3c9; 
  color: #fff; 
  padding: 20px; 
  text-align: center; 
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.4); 
  transition: box-shadow 0.3s ease-in-out; 
}

.container {
  display: flex; /* Flexbox para o layout */
  flex: 1;
}

.sidebar {
  width: 250px; /* Largura da barra lateral */
  background: #54cfcf;
  color: #fff;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar h2 {
  margin: 0;
  padding: 0;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  margin: 10px 0;
}

.sidebar ul li .opcao-menu {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s;
}

.sidebar ul li .opcao-menu:hover {
  color: #ffcc00; /* Cor de destaque ao passar o mouse */
}

main {
  flex: 1; /* Faz o main ocupar o espaço restante */
  padding: 20px;
}

.book-list {
  display: flex;
  flex-direction: column;
}

.books {
  display: flex;
  flex-wrap: wrap; /* Permite que os livros se ajustem na linha */
  gap: 20px; /* Espaçamento entre os livros */
  justify-content: flex-start; /* Alinha os livros à esquerda */
}

.book {
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  width: 300px; /* Largura fixa para cada livro */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s; /* Efeito de transformação suave */
}

.book:hover {
  transform: scale(1.05); /* Efeito de zoom ao passar o mouse */
}

.book img {
  max-width: 100%;
  border-radius: 8px;
}

.rating {
  margin: 10px 0;
}

input {
  width: 100%;
  height: 60px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px; /* Adiciona preenchimento para melhor usabilidade */
}

button {
  background: #28a745;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s; /* Transição suave para mudanças de cor */
}

button:hover {
  background: #218838;
}

footer {
  text-align: center;
  padding: 10px;
  background: #567a88;
  color: #fff;
  margin-top: auto; /* Faz o rodapé ficar fixo na parte inferior */
}
</style>
