const express = require('express')
const router = express.Router()
const Conversion = require('../models/conversion')

router.get('/', async (req, res) => {
    try {
        await Conversion.find()
        .then(conversions => {
            let returnedConversions = [];

            for(let i = 0;i<conversions.length;i++) {
                returnedConversions.push(conversions[i].transform());
            }
            res.json(returnedConversions)
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

router.get('/:id', getConversion, async (req, res) => {
    res.json(res.conversion)
})

async function getConversion(req, res, next) {
    try {
        const conversion = await Conversion.findById(req.params.id)
        if (conversion == null) {
            return res.status(404).json({
                message: 'Cant find conversion'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

    res.conversion = conversion
    next()
}

module.exports = router