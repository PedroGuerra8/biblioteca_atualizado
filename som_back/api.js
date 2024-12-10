const express = require('express');
require('dotenv').config(); // Carrega variáveis de ambiente
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // Função para conectar ao MongoDB
const booksRoutes = require('./routes/books'); // Importa as rotas de livros
const usersRoutes = require('./routes/user'); // Importa as rotas de usuários

const app = express();
const PORT = process.env.PORT || 4000; // Usa a porta definida no .env ou 4000 como padrão

// Conectar ao banco de dados
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
app.use('/api/books', booksRoutes); // Rota de livros
app.use('/api/user', usersRoutes);  // Rota de usuários

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}/`);
});
