const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const connectDB = require('./config/db');  // Certifique-se de que a importação só aconteça uma vez
const booksRoutes = require('./routes/books');
const usersRoutes = require('./routes/user');
const path = require('path');

const MONGO_URI = process.env.MONGO_URI; // Obtém a string de conexão do .env

// Conectando ao MongoDB usando a função connectDB
connectDB();  // Chama a função connectDB para conectar ao banco de dados

const app = express();
const PORT = 4000;

// Middleware para interpretar JSON
app.use(express.json());

app.use(cors());

// Rotas
app.use('/api/books', booksRoutes); // Rota de livros
app.use('/api/user', usersRoutes);  // Rota de usuários

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}/`);
});
