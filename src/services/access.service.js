'use strict'

const shopModel = require("../models/shop.models")
const bcrypt = require('bcrypt')
const crypto = require('node:crypto')
const KeyTokenService = require("./keyToken.service")
const { createTokenPair } = require("../auth/authUtils")
const { getInfoData } = require("../utils")

const RoleShop = {
    // recommend: using number
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService {

    // Đăng ký
    static signup = async ({name, email, password}) => {
        try {
            // Check exists email
            const holderShop = await shopModel.findOne({ email }).lean()
            if (holderShop) {
                return {
                    code: 409,
                    message: 'Shop already resgistered!'
                }
            }
            
            // Mã hóa password
            const passwordHash = await bcrypt.hash(password, 10)
            const newShop = await shopModel.create({
                name,
                email,
                password: passwordHash ,
                roles: [RoleShop.SHOP]
            })

            if (newShop) {
                // Sử dụng thuật toán bất đối xứng: tạo privateKey, publicKey
                // privateKey: Giữ bí mật, không bao giờ được chia sẻ (ký token)
                // publicKey: Chia sẻ công khai với bất kỳ ai cần xác thực token (xác thực token)
                // const { publicKey, privateKey } = await crypto.generateKeyPairSync('rsa', {
                //     modulusLength: 4096,
                //     publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
                //     privateKeyEncoding: { type: 'pkcs1', format: 'pem' }
                // })
                const secretKey = crypto.randomBytes(64).toString('hex')
                // const publicKey = crypto.randomBytes(64).toString('hex')

                const keyStore = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    secretKey
                })

                if (!keyStore) {
                    return {
                        code: 'xxx',
                        message: 'token error'
                    }
                }

                // Tạo một secret key ngẫu nhiên dài 32 bytes và chuyển đổi sang dạng chuỗi hex
                // const secretKey = crypto.randomBytes(32).toString('hex');
                // if (!secretKey) {
                //     return {
                //         code: 'xxx',
                //         message: 'secretKey error'
                //     }
                // }

                // created token pair
                const accessToken = await createTokenPair({ userId: newShop._id, email }, secretKey)
                return {
                    code: 201,
                    metadata: {
                        shop: getInfoData({ fields: ['_id', 'email', 'password'], object: newShop }),
                        tokens: accessToken
                    }
                }
            }
            return {
                code: 200,
                metadata: null
            }

        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'xxxxx'
            }
        }
    }
}

module.exports = AccessService