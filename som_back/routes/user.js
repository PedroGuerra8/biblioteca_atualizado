const express = require('express');
const authController = require('../controllers/authController');
const User = require('../models/user');
const router = express.Router();

// REGISTRO DE USUÁRIO
router.post('/criar', authController.register);

// LOGIN DO USUÁRIO
router.post('/login', authController.login);

// LISTAR TODOS OS USUÁRIOS (GET /user)
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // Consulta todos os usuários
        res.status(200).json(users); // Envia os usuários como resposta
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ message: 'Erro ao buscar os usuários' });
    }
});

// ATUALIZAR UM USUÁRIO (PUT /user/:id)
router.put('/:id', async (req, res) => {
    const { username, password } = req.body;

    const updatedFields = {};
    if (username) updatedFields.username = username;
    if (password) updatedFields.password = password;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updatedFields },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.status(200).json({ message: 'Usuário atualizado com sucesso!', User: updatedUser });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ error: 'Erro ao atualizar usuário no banco de dados' });
    }
});

// DELETAR UM USUÁRIO (DELETE /user/:id)
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
