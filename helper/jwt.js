const jwt = require('jsonwebtoken')
const key = process.env.SECRET_KEY

function createToken(payload) {
    return jwt.sign(payload, key)
}

function verifyToken(payload) {
    return jwt.verify(payload, key)
}

module.exports = {
    createToken,
    verifyToken
}