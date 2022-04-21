const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { hashPassword, comparePassword } = require('../helper/bcrypt')
const { createToken } = require('../helper/jwt')

class UserController {
    static async register(req, res, next) {
        const { email, name, password } =  req.body
        try {
            if(!email) {
                throw ({ name: 'Email is required'})
            }
            if(!name) {
                throw ({ name: 'Name is required'})
            }
            if(!password) {
                throw ({ name: 'Password is required'})
            }
            const response = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashPassword(password)
                }
            })
            res.status(200).json({
                id: response.id,
                email: response.email
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        const { email, password } = req.body
        try {
            if(!email) {
                throw ({ name: 'Email is required'})
            }
            if(!password) {
                throw ({ name: 'Password is required'})
            }
            const findUser = await prisma.user.findUnique({
                where: {
                    email: email,
                }
            })
            if (!findUser) {
                throw ({ name: "Invalid email/password"})
            } else {
                const isValidPassword = comparePassword(password, findUser.password)
                if(!isValidPassword) {
                    throw ({ name: 'Invalid email/password'})
                } else {
                    const payload = {
                        id: findUser.id,
                        email: findUser.email
                    }
                    const token = createToken(payload)
                    const response = {
                        access_token: token,
                        name: findUser.name,
                        id: findUser.id,
                        email: findUser.email
                    }
                    res.status(200).json(response)
                }
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController