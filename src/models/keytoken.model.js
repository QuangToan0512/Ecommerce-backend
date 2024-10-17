'use strict'

const { Schema, model, Types, default: mongoose } = require('mongoose')

const COLLECTION_NAME = 'Keys'
const DOCUMENT_NAME = 'Key'

const keyTokenSchema = new Schema({
    user: {
        type: Types.ObjectId,
        require: true,
        ref: 'Shop'
    },
    publicKey: {
        type: String,
        require: true,
    },
    token: {
        type: String,
        require: true,
    },
    refreshToken: { // detect 
        type: Array,
        default: []
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true 
})

module.exports = model(DOCUMENT_NAME, keyTokenSchema)