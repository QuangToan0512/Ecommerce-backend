require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const app = express()

// init middlewares
app.use(express.json()); // Middleware để phân tích body JSON
app.use(express.urlencoded({ extended: true })); // Middleware để phân tích body của form URL encoded

//  recomment: using 'dev' with dev enviroment, using 'combined' with product enviroment
app.use(morgan('dev'));
app.use(helmet()) // security headers info
app.use(compression()) // Compress response bodies for all request that traverse through the middleware

// init db
require('./dbs/init.mongodb')

// init routes
app.use('/', require('./routers'))

// handling error

module.exports = app