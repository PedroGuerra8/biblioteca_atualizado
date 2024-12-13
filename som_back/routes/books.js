const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const multer = require('multer');

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Diretório onde as imagens serão salvas
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Nome único para cada arquivo
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png/; // Tipos de arquivo permitidos
        const isValid = allowedTypes.test(file.mimetype);
        if (isValid) {
            cb(null, true);
        } else {
            cb(new Error('Formato de arquivo inválido. Apenas JPEG e PNG são permitidos.'));
        }
    },
    limits: { fileSize: 2 * 1024 * 1024 }, // Limite de 2MB
});

// Rotas do CRUD de livros

// Criar livro (com upload de imagem)
router.post(
    '/',
    upload.single('image'), // Middleware para upload de imagem
    bookController.createBook
);

// Listar todos os livros
router.get('/', bookController.getAllBooks);

// Atualizar livro (com upload de imagem)
router.put(
    '/:id',
    upload.single('image'), // Middleware para upload de imagem (opcional)
    bookController.updateBook
);

// Deletar livro por ID
router.delete('/:id', bookController.deleteBook);

module.exports = router;
