const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const app = express()

// init middlewares

//  recomment: using 'dev' with dev enviroment, using 'combined' with product enviroment
app.use(morgan('dev'))
app.use(helmet()) // security headers info
app.use(compression()) // Compress response bodies for all request that traverse through the middleware

// init db

// init routes
app.get('/', (req, res, next) => {
    const str = 'hello world'
    return res.status(200).json({
        message: 'res message',
        metadata: str.repeat(10000)
    })
})

// handling error

module.exports = app