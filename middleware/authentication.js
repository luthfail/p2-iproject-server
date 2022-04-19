const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { verifyToken } = require('../helper/jwt')

const authorization = async (req, res, next) => {
    const { authorization } = req.headers
    if(!authorization) {
        throw ({ name: 'Authorization is required'})
    }
    try {
        const token = authorization.split(' ')[1]
        const payload = verifyToken(token)
        const user = await prisma.user.findOne({
            where: {
                id: payload.id
            }
        })
        if(!user) {
            throw ({ name: 'Invalid token'})
        }
        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authorization