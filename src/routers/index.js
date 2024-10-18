'use strict'

const express = require('express')
const { apiKey, permission } = require('../auth/checkAuth')

const router = express.Router()

// Check apiKey
router.use(apiKey)

// Check permission
router.use(permission('0000'))

router.use('/v1/api', require('./access'))

// router.get('', (req, res, next) => { 
//     const str = 'hello world'
//     console.log(str);
//     return res.status(200).j21son({
//         message: 'res message',
//         // metadata: str.repeat(10000)
//     })
// })


module.exports = router