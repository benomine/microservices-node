require('dotenv').config()

const express = require('express')
var https = require('https');
var http = require('http');
var fs = require('fs');
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())

const conversionsRouter = require('./routes/conversions')
app.use('/api/conversion', conversionsRouter)

app.listen(4000, () => console.log('server started'))