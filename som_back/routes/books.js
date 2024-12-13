const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const multer = require('multer');
const path = require('path');


// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const isValid = filetypes.test(file.mimetype);
        if (isValid) {
            cb(null, true);
        } else {
            cb(new Error('Formato de arquivo inválido. Apenas JPEG e PNG são permitidos.'));
        }
    },
    limits: { fileSize: 2 * 1024 * 1024 }, // Limite de 2MB
});

// Rotas do CRUD de livros
router.post(
    '/',
     // Middleware para autenticação
    upload.single('image'), // Middleware para upload de imagem
    bookController.createBook
);

router.get('/', bookController.getAllBooks); // Listar todos os livros

router.put(
    '/:id',
    
    upload.single('image'), // Middleware para upload de imagem (caso seja enviada na atualização)
    bookController.updateBook
);

router.delete('/:id',  bookController.deleteBook); // Deletar livro por ID

module.exports = router;
