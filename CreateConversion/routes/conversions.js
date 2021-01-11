const express = require('express')
const router = express.Router()
const Conversion = require('../models/conversion')

router.post('/', async (req, res) => {
    const conversion = new Conversion({
        nom: req.body.nom,
        nomUser: req.body.nomUser,
        valeur: req.body.valeur,
        dateAppel: req.body.dateAppel
    })

    try {
        const newConversion = await conversion.save()
        res.status(201).json(newConversion)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

module.exports = router