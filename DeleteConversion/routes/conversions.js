const express = require('express')
const router = express.Router()
const Conversion = require('../models/conversion')

router.delete('/', getConversion, async (req, res) => {
    try {
        await res.conversion.remove()
        res.json({
            message: 'Deleted This conversion'
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

async function getConversion(req, res, next) {
    try {
        const conversion = await Conversion.findById(req.body.id)
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