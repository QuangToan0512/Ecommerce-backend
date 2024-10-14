'use strict'

const mongoose = require('mongoose')
const { countConnect } = require('../helpers/check.connect')
const { db: { host, name, port } } = require('../configs/config.mongodb')
const { checkOverload } = require('../helpers/check.connect')

const connectString = `mongodb://${host}:${port}/${name}` // db

// Design pattern : Singleton
class Database {
    constructor() {
        this.connect()
    }

    // connect
    connect(type = 'mongodb') { // oracle, mongodb, mysql, ...
        if (1 === 1) {
            mongoose.set('debug', true)
            mongoose.set('debug', { color: true })
        }
        mongoose.connect(connectString, {
            maxPoolSize: 50
            //maxPoolSize:  Cho phép 50 kết nối đồng thời đến mongoDB: giúp cải thiện hiệu suất - 
            //- tùy thuộc vào việc đánh giá số lượng kết nối của ứng dụng, tài nguyên của máy chủ, cấu hình mạng,...
        })
         .then(_ => {
            checkOverload()
            console.log('Count connect:', countConnect());
            console.log('Connected Mongodb success', connectString)})
         .catch(err => console.log('Mongodb connect err', err))
    }
    
    static getInstance() {
        if(!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }
}

const instanceDb = Database.getInstance()
module.exports = instanceDb