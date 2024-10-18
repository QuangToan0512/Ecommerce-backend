'use strict'

const { findById } = require("../services/apikey.service")

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

// api key sẽ được gửi thông qua header (x-api-key)

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString()
        if  (!key) {
            return res.status(403).json({
                message: 'Forbidden Error',
                statusCode: 403
            })
        }

        // check apikey exists
        const objKey = await findById(key)
        if  (!objKey) {
            return res.status(403).json({
                message: 'Forbidden Error',
                statusCode: 403
            })
        }

        req.objKey = objKey
        return next() // chuyển đến middleware tiếp theo 
    } catch (error) {
        throw error
    }
}

const permission = (permission) => {
    return (req, res, next) => { // closures
        if(!req.objKey.permissions) {
            return res.status(403).json({
                message: 'Permission denied',
                statusCode: 403
            })
        }

        if(!req.objKey.permissions.includes(permission)) {
            return res.status(403).json({
                message: 'Permission denied',
                statusCode: 403
            })
        }
        return next()
    }
}

module.exports = { apiKey, permission }

