require('dotenv').config()

const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const Calculs = require('../utils/calculs');
const conv = require('../models/conversion');
var https = require('https');

router.post('/', async (req, res) => {
    const sens = req.body.Sens
    let conversion = new conv.Conversion(
        req.body.Nom, req.body.NomUser, req.body.DateAppel, req.body.Valeur
    )

    const result = sens == 0 ? Calculs.ConvertFToC(req.body.Valeur) : Calculs.ConvertCToF(req.body.Valeur)

    try {
        const instance = axios.create({
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        });
        instance.post(process.env.URI, conversion);
    } catch (err) {
        res.send(err)
    }

    res.status(200).json(result)
})

module.exports = router