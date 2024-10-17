'use strict'

const AccessService = require("../services/access.service")

class AccessController {
    signup = async (req, res, next) => {
        try {
            console.log(`[P]::signup::`, req.body)
            /*
                200: OK
                201: CREATED
            */
            // return res.status(201).json({
            //     code: 'xxx',
            //     metadata: { test: 1 }
            // })
            const result = await AccessService.signup(req.body)
            return res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AccessController()