'use strict'

const mongoose = require('mongoose')

const connectString = 'mongodb://localhost:27017/ecommerce' // db

mongoose.connect(connectString)
    .then(_ => console.log('connected Mongodb success'))
    .catch(err => console.log('Mongodb connect err', err))

if (1 === 1) {
    mongoose.set('debug', true)
    mongoose.set('debug', { color: true })
}

module.exports = mongoose