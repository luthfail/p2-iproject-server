const { PrismaClient } = require('@prisma/client')
const { verifyToken } = require('../helper/jwt')
const prisma = new PrismaClient()

const authorization = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        if(!access_token) {
            throw ({ name: 'Authorization is required'})
        } else {
            const token = access_token
            const payload = verifyToken(token)
            const user = await prisma.user.findUnique({
                where: {
                    id: payload.id
                }
            })
            if(!user) {
                throw ({ name: 'Invalid token'})
            }
                req.user = {
                    id: user.id,
                    email: user.email
                }
            console.log('masuk auth')
            next()
        }
    } catch (error) {
        next(error)
    }
}

module.exports = authorization