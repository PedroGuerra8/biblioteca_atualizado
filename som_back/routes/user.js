// routes/user.js
const express = require('express');
const User = require('../models/user');
const router = express.Router();
const authController = require('../controllers/authController');

// REGISTRO DE USUÁRIO
router.post('/criar', authController.register); // Chama diretamente o método `register` do authController

// LOGIN DO USUÁRIO
router.post('/login', authController.login); // Chama diretamente o método `login` do authController

// LISTAR TODOS OS USUÁRIOS
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // Busca todos os usuários no banco de dados
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ message: 'Erro ao buscar os usuários', error });
    }
});

// ATUALIZAR UM USUÁRIO
router.put('/:id', async (req, res) => {
    const { username, password } = req.body;

    const updatedFields = {};
    if (username) updatedFields.username = username;
    if (password) updatedFields.password = await bcrypt.hash(password, 10); // Criptografa a senha antes de atualizar

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updatedFields },
            { new: true } // Retorna o documento atualizado
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.status(200).json({ message: 'Usuário atualizado com sucesso!', user: updatedUser });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ error: 'Erro ao atualizar usuário no banco de dados', error });
    }
});

// DELETAR UM USUÁRIO
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({ message: 'Erro ao deletar usuário', error });
    }
});

module.exports = router;
