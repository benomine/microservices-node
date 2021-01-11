require('dotenv').config()

const express = require('express')
var https = require('https');
var http = require('http');
var fs = require('fs');
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true , useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())

const conversionsRouter = require('./routes/conversions')
app.use('/api/conversion', conversionsRouter)

var options = {
    key: fs.readFileSync('./certificates/key.pem'),
    cert: fs.readFileSync('./certificates/cert.pem')
};

http.createServer(app).listen(7000);
https.createServer(options, app).listen(7001);