<template>
    <div class="container">
        <h1>Cadastrar Livro</h1>
        <form @submit.prevent="submitForm" enctype="multipart/form-data">
            <div class="form-group">
                <label for="title">Título:</label>
                <input type="text" v-model="title" id="title" required />
            </div>
            <div class="form-group">
                <label for="author">Autor:</label>
                <input type="text" v-model="author" id="author" required />
            </div>
            <div class="form-group">
                <label for="year">Ano:</label>
                <input type="number" v-model="year" id="year" required />
            </div>
            <div class="form-group">
                <label for="image">Imagem:</label>
                <input type="file" @change="handleFileUpload" id="image" accept="image/*" />
            </div>
            <button type="submit" :disabled="isSubmitting">
                {{ isSubmitting ? 'Cadastrando...' : 'Cadastrar Livro' }}
            </button>
            <p v-if="message" :class="{ 'success-message': isSuccess, 'error-message': !isSuccess }">
                {{ message }}
            </p>
        </form>
    </div>
    <div class="books">
        <div class="book" v-for="book in books" :key="book.title">
            <img :src="'http://localhost:4000/' + book.image"   :alt="book.title" class="imageBook"/>
            <h3>{{ book.title }}</h3>
            <p>Autor: {{ book.author }}</p>
            <p>Descrição breve sobre o livro.</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            title: '',
            author: '',
            year: '',
            image: null, // Armazena o arquivo selecionado
            isSubmitting: false, // Controle do botão de envio
            message: '', // Mensagem de feedback
            isSuccess: false, // Controle do tipo de mensagem
            books : []
        };
    },
    mounted() {
        this.getBooks()
    },
    methods: {
        handleFileUpload(event) {
            this.image = event.target.files[0]; // Salva o arquivo selecionado no estado
        },
        async getBooks() {
            try {
                const respo = await axios.get("http://localhost:4000/api/books");
                this.books = respo.data.map((item) => item);
            } catch (error) {
                console.error("Error fetching books:", error); // Debug error
            }
        },
        async submitForm() {
            this.isSubmitting = true;
            this.message = '';
            console.log(this.title, this.author, this.year);

            try {
                // Criação do objeto FormData para envio multipart
                const formData = new FormData();
                formData.append('title', this.title);
                formData.append('author', this.author);
                formData.append('year', this.year);
                if (this.image) {
                    formData.append('image', this.image); // Adiciona o arquivo ao formulário
                }

                // Envio da requisição para o backend
                await axios.post('http://localhost:4000/api/books', formData)

                this.isSuccess = true;
                this.message = 'Livro cadastrado com sucesso!';
                this.clearForm();
            } catch (error) {
                this.isSuccess = false;
                this.message = 'Erro ao cadastrar livro. Tente novamente.';
                console.log(error);

            } finally {
                this.isSubmitting = false;
            }
        },
        clearForm() {
            this.title = '';
            this.author = '';
            this.year = '';
            this.image = null;
            document.getElementById('image').value = ''; // Limpa o input de arquivo
        },
    },
};
</script>

<style scoped>
/* CSS baseado no estilo anterior */
* {
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.container {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 40px;
    width: 400px;
    transition: transform 0.3s, box-shadow 0.3s;
}

.imageBook{
    width: 120px;
}

.container:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

h1 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
    color: #555;
}

input {
    width: 100%;
    padding: 12px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    transition: border 0.3s;
}

input[type="file"] {
    padding: 5px;
}

input:focus {
    border-color: #28a745;
    outline: none;
}

button {
    background: #28a745;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    width: 100%;
    font-size: 16px;
    transition: background 0.3s;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

button:hover:enabled {
    background: #218838;
}

.success-message {
    color: green;
    text-align: center;
    margin-top: 10px;
}

.error-message {
    color: red;
    text-align: center;
    margin-top: 10px;
}

@media (max-width: 500px) {
    .container {
        width: 90%;
    }
}
</style>