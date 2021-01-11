const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const Calculs = require('../utils/calculs');
const conv = require('../models/conversion');

router.post('/', async (req, res) => {
    const sens = req.body.sens
    let conversion = new conv.Conversion(
        req.body.nom, req.body.nomUser, req.body.dateAppel, req.body.valeur
    )

    console.log(conversion)
    const result = sens == 0 ? Calculs.ConvertFtoC(req.body.valeur) : Calculs.ConvertCToF(req.body.valeur)
    try {
        axios.post('http://localhost:4000/api/conversion', conversion)
    } catch (err) {
        res.send(err)
    }
    res.status(200).json(result)
})

module.exports = router