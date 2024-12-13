const Book = require('../models/books'); // Importa o modelo de Livro

// Criação de um novo livro
const createBook = async (req, res) => {
    const { title, author, year } = req.body;
    const image = req.file ? req.file.path : null; // Caminho da imagem enviada

    if (!title || !author || !year) {
        return res.status(400).json({ message: 'Título, autor e ano são obrigatórios' });
    }

    try {
        const newBook = await Book.create({ title, author, year, image });
        res.status(201).json({ message: 'Livro criado com sucesso', book: newBook });
    } catch (error) {
        console.error('Erro ao criar livro:', error);
        res.status(500).json({ message: 'Erro ao criar livro', error });
    }
};

// Listar todos os livros
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find(); // Busca todos os livros no banco
        res.status(200).json(books);
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
        res.status(500).json({ message: 'Erro ao buscar livros', error });
    }
};

// Atualização de um livro
const updateBook = async (req, res) => {
    const { title, author, year } = req.body;
    const image = req.file ? req.file.path : null; // Caminho da imagem enviada
    const updatedFields = { title, author, year };

    if (image) {
        updatedFields.image = image; // Atualiza a imagem somente se uma nova for enviada
    }

    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            updatedFields,
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }

        res.status(200).json({ message: 'Livro atualizado com sucesso', book: updatedBook });
    } catch (error) {
        console.error('Erro ao atualizar livro:', error);
        res.status(500).json({ message: 'Erro ao atualizar livro', error });
    }
};

// Exclusão de um livro
const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);

        if (!deletedBook) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }

        res.status(200).json({ message: 'Livro deletado com sucesso', book: deletedBook });
    } catch (error) {
        console.error('Erro ao deletar livro:', error);
        res.status(500).json({ message: 'Erro ao deletar livro', error });
    }
};

// Exporta as funções
module.exports = {
    createBook,
    getAllBooks,
    updateBook,
    deleteBook,
};
