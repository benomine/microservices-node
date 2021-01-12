require('dotenv').config()

const express = require('express')
var https = require('https');
var http = require('http');
var fs = require('fs');
const app = express()

app.use(express.json())

const conversionsRouter = require('./routes/conversions')
app.use('/api/conversiontemperature', conversionsRouter)
var options = {
    key: fs.readFileSync('./certificates/key.pem'),
    cert: fs.readFileSync('./certificates/cert.pem')
};

http.createServer(app).listen(6000, '0.0.0.0');
https.createServer(options, app).listen(6001, '0.0.0.0');