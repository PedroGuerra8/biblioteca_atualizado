const mongoose = require('mongoose');
const bookController = require('../controllers/bookController')

const bookSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true // Definido como obrigatório, pode ser ajustado conforme necessidade
    },
    author: { 
        type: String, 
        required: true // Definido como obrigatório
    },
    year: { 
        type: Number, // Melhor utilizar como Number, ou use Date se for o caso
        required: true 
    },
    image: { 
        type: String, 
        required: false // Campo opcional
    },
}, 
{ timestamps: true });

module.exports = mongoose.model('Book', bookSchema);