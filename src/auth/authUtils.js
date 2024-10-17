'use strict'

const JWT = require('jsonwebtoken')

const createTokenPair = async (payload, secretKey ) => {
    try {
        // Tạo accessToken với privateKey, Ký accessToken với privateKey
        const accessToken = await JWT.sign(payload, secretKey, {
            // algorithm: 'RS256',
            expiresIn: '2 days'
        })

        // const refreshToken = await JWT.sign(payload, privateKey, {
        //     algorithm: 'RS256',
        //     expiresIn: '7 days'
        // })

        // Xác minh token bằng publicKey
        JWT.verify(accessToken, secretKey, (err, decode) => {
            if (err) {
                console.error('error verify::', err)
            } else {
                console.error('decode verify::', decode)
            }
        })

        return { accessToken }
    } catch (error) {
        console.error('Lỗi khi tạo token:', error)
        throw error // Tuỳ chọn: ném lại lỗi để phần gọi hàm xử lý
    }
}

module.exports = { createTokenPair }