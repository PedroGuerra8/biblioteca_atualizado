// controllers/bookController.js
const Book = require('../models/books');

// Cria um novo livro
exports.createBook = async (req, res) => {
    const { title, author, year, image } = req.body;

    if (!title || !author || !year) {
        return res.status(400).json({ message: 'Título, autor e ano são obrigatórios' });
    }

    try {
        const newBook = new Book({ title, author, year, image });
        await newBook.save();

        res.status(201).json({
            message: 'Livro criado com sucesso!',
            book: newBook,
        });
    } catch (error) {
        console.error('Erro ao criar livro:', error);
        res.status(500).json({ message: 'Erro ao criar livro', error });
    }
};

// Lista todos os livros
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.error('Erro ao listar livros:', error);
        res.status(500).json({ message: 'Erro ao listar livros', error });
    }
};

// Atualiza um livro pelo ID
exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, year, image } = req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { title, author, year, image },
            { new: true } // Retorna o livro atualizado
        );

        if (!updatedBook) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }

        res.status(200).json({
            message: 'Livro atualizado com sucesso!',
            book: updatedBook,
        });
    } catch (error) {
        console.error('Erro ao atualizar livro:', error);
        res.status(500).json({ message: 'Erro ao atualizar livro', error });
    }
};

// Deleta um livro pelo ID
exports.deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }

        res.status(200).json({ message: 'Livro deletado com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar livro:', error);
        res.status(500).json({ message: 'Erro ao deletar livro', error });
    }
};
