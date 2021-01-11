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

conversionSchema.method('transform', function() {
    var obj = this.toObject();
 
    //Rename fields
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    return obj;
});

module.exports = mongoose.model('Conversion', conversionSchema, 'appels')