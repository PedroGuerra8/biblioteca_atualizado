const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Secret Key para JWT
const SECRET_KEY = process.env.JWT_SECRET || 'secretKey';

// Registro do usuário
exports.register = async (req, res) => {
    const { username, password } = req.body;

    console.log('Tentativa de registro:', username, password); // Log para verificar os dados recebidos

    if (!username || !password) {
        return res.status(400).json({ message: 'Usuário e senha são obrigatórios' });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log('Usuário já existe:', username); // Log para usuário duplicado
            return res.status(409).json({ message: 'Usuário já existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword });

        console.log('Usuário criado com sucesso:', newUser); // Log de sucesso

        res.status(201).json({ message: 'Usuário registrado com sucesso', user: newUser });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error); // Log de erro
        res.status(500).json({ message: 'Erro ao registrar usuário', error });
    }
};

// Login do usuário
exports.login = async (req, res) => {
    const { username, password } = req.body;

    console.log('Tentativa de login:', username, password); // Log para verificar os dados recebidos

    if (!username || !password) {
        return res.status(400).json({ message: 'Usuário e senha são obrigatórios' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.log('Usuário não encontrado:', username); // Log para usuário não encontrado
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Senha inválida para o usuário:', username); // Log para senha inválida
            return res.status(401).json({ message: 'Senha inválida' });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

        console.log('Login bem-sucedido para o usuário:', username); // Log de sucesso

        res.status(200).json({
            message: 'Login realizado com sucesso',
            token,
        });
    } catch (error) {
        console.error('Erro ao realizar login:', error); // Log de erro
        res.status(500).json({ message: 'Erro ao realizar login', error });
    }
};
