// routes/user.js
const express = require('express');
const User = require('../models/user');
const router = express.Router();

// REGISTRO DE USUÁRIO
router.post('/criar', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso!', user });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao registrar usuário', error });
    }
});

// LOGIN DO USUÁRIO
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(400).json({ message: 'Credenciais inválidas' });
        }
        res.status(200).json({ message: 'Login bem-sucedido', user });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao fazer login', error });
    }
});

// LISTAR TODOS OS USUÁRIOS
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ message: 'Erro ao buscar os usuários' });
    }
});

// ATUALIZAR UM USUÁRIO
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
