const express = require('express');
const router = express.Router()
const Conversion = require('../models/conversion')

router.put('/', async (req, res) => {
    const id = req.body.id;
    const nouveauNom = req.body.nom;
    const nouveauNomUser = req.body.nomUser;
    const nouveauValeur = req.body.valeur;
    const nouveauDateAppel = req.body.dateAppel;

    Conversion.findById(id).then((conversion) => {
        return Object.assign(conversion,
            {nom: nouveauNom, nomUser: nouveauNomUser, valeur: nouveauValeur, dateAppel: nouveauDateAppel});
    }).then((conversion) => {
        return conversion.save();
    }).then((updatedConversion) => {
        res.status(202).json({
            msg: 'Conversion updated',
            updatedConversion
        });
    }).catch((err) => {
        res.status(404).send(err);
    });
})

module.exports = router