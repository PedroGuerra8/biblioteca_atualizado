const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define o esquema do usuário
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Nome de usuário deve ser único
    },
    password: {
        type: String,
        required: true,
    },
});

// Middleware para criptografar a senha antes de salvar
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Exporta o modelo
module.exports = mongoose.model('User', userSchema);
