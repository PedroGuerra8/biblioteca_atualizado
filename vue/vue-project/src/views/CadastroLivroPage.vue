<template>
    <div class="container">
        <h1>{{ isEditing ? 'Atualizar Livro' : 'Cadastrar Livro' }}</h1>
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
                {{ isSubmitting ? 'Salvando...' : isEditing ? 'Atualizar Livro' : 'Cadastrar Livro' }}
            </button>
            <p v-if="message" :class="{ 'success-message': isSuccess, 'error-message': !isSuccess }">
                {{ message }}
            </p>
        </form>
        <div class="books">
            <div class="book" v-for="book in books" :key="book._id">
                <img :src="'http://localhost:4000/' + book.image" :alt="book.title" class="imageBook" />
                <h3>{{ book.title }}</h3>
                <p>Autor: {{ book.author }}</p>
                <button @click="editBook(book)" class="edit-button">Editar</button>
                <button @click="deleteBook(book._id)" class="delete-button">Excluir</button>
            </div>
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
            books: [],
            isEditing: false, // Indica se está editando um livro
            editingBookId: null, // ID do livro sendo editado
        };
    },
    mounted() {
        this.getBooks();
    },
    methods: {
        handleFileUpload(event) {
            this.image = event.target.files[0]; // Salva o arquivo selecionado no estado
        },
        async getBooks() {
            try {
                const response = await axios.get('http://localhost:4000/api/books');
                this.books = response.data;
            } catch (error) {
                console.error('Erro ao buscar livros:', error);
            }
        },
        async submitForm() {
            this.isSubmitting = true;
            this.message = '';

            if (this.isEditing) {
                await this.updateBook();
            } else {
                await this.createBook();
            }
        },
        async createBook() {
            try {
                const formData = new FormData();
                formData.append('title', this.title);
                formData.append('author', this.author);
                formData.append('year', this.year);
                if (this.image) {
                    formData.append('image', this.image);
                }

                await axios.post('http://localhost:4000/api/books', formData);
                this.isSuccess = true;
                this.message = 'Livro cadastrado com sucesso!';
                this.clearForm();
                this.getBooks(); // Atualiza a lista de livros
            } catch (error) {
                this.isSuccess = false;
                this.message = 'Erro ao cadastrar livro. Tente novamente.';
                console.error(error);
            } finally {
                this.isSubmitting = false;
            }
        },
        async updateBook() {
            try {
                const formData = new FormData();
                formData.append('title', this.title);
                formData.append('author', this.author);
                formData.append('year', this.year);
                if (this.image) {
                    formData.append('image', this.image); // Apenas adiciona a imagem se for atualizada
                }

                await axios.put(`http://localhost:4000/api/books/${this.editingBookId}`, formData);
                this.isSuccess = true;
                this.message = 'Livro atualizado com sucesso!';
                this.clearForm();
                this.getBooks(); // Atualiza a lista de livros
            } catch (error) {
                this.isSuccess = false;
                this.message = 'Erro ao atualizar livro. Tente novamente.';
                console.error(error);
            } finally {
                this.isSubmitting = false;
                this.isEditing = false;
                this.editingBookId = null;
            }
        },
        async deleteBook(bookId) {
            try {
                await axios.delete(`http://localhost:4000/api/books/${bookId}`);
                this.books = this.books.filter(book => book._id !== bookId);
                this.message = 'Livro excluído com sucesso!';
                this.isSuccess = true;
            } catch (error) {
                this.message = 'Erro ao excluir o livro. Tente novamente.';
                this.isSuccess = false;
                console.error('Erro ao excluir o livro:', error);
            }
        },
        editBook(book) {
            // Preenche o formulário com os dados do livro selecionado para edição
            this.title = book.title;
            this.author = book.author;
            this.year = book.year;
            this.image = null; // Reseta o campo de imagem para forçar o usuário a escolher uma nova se necessário
            this.isEditing = true;
            this.editingBookId = book._id;
        },
        clearForm() {
            this.title = '';
            this.author = '';
            this.year = '';
            this.image = null;
            this.isEditing = false;
            this.editingBookId = null;
            document.getElementById('image').value = ''; // Limpa o input de arquivo
        },
    },
};
</script>

<style scoped>
/* Estilo semelhante ao anterior */
.edit-button {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    font-size: 14px;
}

.edit-button:hover {
    background: #0056b3;
}
</style>
