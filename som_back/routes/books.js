const express = require('express');
const router = express.Router();
const Book = require('../models/books');  // Importação do modelo corretamente
const bookController = require('../controllers/bookController')

// Rota GET para listar todos os livros
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();  // Consulta todos os livros
        res.status(200).json(books);  // Envia os livros como resposta
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
        res.status(500).json({ message: 'Erro ao buscar os livros', error });
    }
});

// POST /books - Criação de livro
router.post('/', async (req, res) => {
    const { title, author, year, image } = req.body;
    
    // Validação simples dos dados
    if (!title || !author || !year) {
        return res.status(400).json({ error: 'Título, autor e ano são obrigatórios' });
    }

    // Verificando se o ano é um número válido
    if (isNaN(year)) {
        return res.status(400).json({ error: 'Ano inválido, deve ser um número' });
    }

    try {
        const newBook = new Book({ title, author, year, image });
        await newBook.save();
        res.status(201).json({ message: 'Livro criado com sucesso!', book: newBook });
    } catch (error) {   
        console.error('Erro ao salvar livro:', error);
        res.status(500).json({ error: 'Erro ao salvar livro no banco de dados' });
    }
});

// PUT /books/:id - Atualizar livro
router.put('/:id', async (req, res) => {
    const { title, author, year, image } = req.body;

    // Criação de um objeto com os campos a serem atualizados
    const updatedFields = {};

    // Verificando se cada campo foi enviado e adicionando ao objeto de atualização
    if (title) updatedFields.title = title;
    if (author) updatedFields.author = author;
    if (year) updatedFields.year = year;
    if (image) updatedFields.image = image;

    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { $set: updatedFields }, // Atualiza somente os campos que foram enviados
            { new: true }
        );

        // Caso o livro não seja encontrado
        if (!updatedBook) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }

        // Retorna o livro atualizado
        res.status(200).json({ message: 'Livro atualizado com sucesso!', book: updatedBook });
    } catch (error) {
        console.error('Erro ao atualizar livro:', error);
        res.status(500).json({ error: 'Erro ao atualizar livro no banco de dados' });
    }
});

// DELETE /books/:id - Deletar livro
router.delete('/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);  // Deleta o livro com o id fornecido

        if (!deletedBook) {
            return res.status(404).json({ message: 'Livro não encontrado' });  // Caso o livro não exista
        }

        res.status(200).json({ message: 'Livro deletado com sucesso' });  // Resposta de sucesso
    } catch (error) {
        console.error('Erro ao deletar livro:', error);
        res.status(500).json({ message: 'Erro ao deletar livro', error });  // Em caso de erro no banco de dados
    }
});


// Rotas de gerenciamento de livros
router.post('/', bookController.createBook); // Criar livro
router.get('/', bookController.getBooks); // Listar todos os livros
router.put('/:id', bookController.updateBook); // Atualizar livro por ID
router.delete('/:id', bookController.deleteBook); // Deletar livro por ID

module.exports = router;
