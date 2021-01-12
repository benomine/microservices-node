require('dotenv').config()

const express = require('express')
var https = require('https');
var http = require('http');
var fs = require('fs');
const app = express()
const mongoose = require('mongoose')

//mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true , useUnifiedTopology: true})
//const db = mongoose.connection

/* db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database')) */

var connectWithRetry = function() {
    return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true , useUnifiedTopology: true}, function(err) {
      if (err) {
        console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
        setTimeout(connectWithRetry, 5000);
      }
    });
  };
connectWithRetry();

app.use(express.json())

const conversionsRouter = require('./routes/conversions')
app.use('/api/conversion', conversionsRouter)

var options = {
    key: fs.readFileSync('./certificates/key.pem'),
    cert: fs.readFileSync('./certificates/cert.pem')
};

http.createServer(app).listen(4000, '0.0.0.0');
https.createServer(options, app).listen(4001, '0.0.0.0');