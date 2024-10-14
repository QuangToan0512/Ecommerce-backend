'use strict'

const mongoose = require('mongoose')
const os = require('os')
const proccess = require('process')

const _SECONDS = 5000

// Kiểm tra số lượng connect tới mongodb
const countConnect = () => {
    const numConnection = mongoose.connections.length
    return numConnection
}

// Check overload connection
const checkOverload = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length
        const numCores = os.cpus().length
        const memoryUsage = proccess.memoryUsage().rss
        // Giả sử mỗi core server chỉ chịu được 5 connection
        const maxConnection = numCores * 5
        if(numConnection > maxConnection) {
            console.log('Connection overload detected');
        }
        // console.log('numCores', numCores);
        // console.log(`memoryUsage ${memoryUsage / 1024 / 1024}MB`);
    }, _SECONDS)
}

module.exports = {
    countConnect,
    checkOverload
}