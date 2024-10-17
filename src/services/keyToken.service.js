'use strict'

const keytokenModel = require("../models/keytoken.model")

class KeyTokenService {
    static createKeyToken = async ({userId, secretKey}) => {
        try {
            const tokens = await keytokenModel.create({
                user: userId,
                token: secretKey
            })
            return tokens ? secretKey : null
        } catch (error) {
            return error
        }
    }
}

module.exports = KeyTokenService