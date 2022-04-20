const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { verifyToken } = require('../helper/jwt')

const authorization = async (req, res, next) => {
    const { access_token } = req.headers
    if(!access_token) {
        throw ({ name: 'Authorization is required'})
    }
    try {
        const token = access_token
        const payload = verifyToken(token)
        const user = await prisma.user.findUnique({
            where: {
                id: payload.id
            }
        })
        if(!user) {
            throw ({ name: 'Invalid token'})
        } else {
            req.user = {
                id: user.id,
                email: user.email
            }
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authorization