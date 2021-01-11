const mongoose = require('mongoose')

const conversionSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    nomUser: {
        type: String,
        required: true
    },
    valeur: {
        type: Number,
        required: true
    },
    dateAppel: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Conversion', conversionSchema, 'appels')