const { PrismaClient } = require('@prisma/client');
const XenditInvoice = require('../API/xendit')
const SpotifyApi = require('../API/spotify')
const prisma = new PrismaClient();

class ShopController {
    static async getAll(req, res, next) {
        try {
            const response = await prisma.album.findMany()
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async detailAlbum(req, res, next) {
        const { id } = req.params
        try {
            const response = await prisma.album.findUnique({
                where: {
                    id: +id
                },
            })
            const spotify = await SpotifyApi.getAlbum(response.SpotifyUUID);

            res.status(200).json({
                    price: response.price,
                    artist: spotify.artists[0].name,
                    images: spotify.images[0].url,
                    name: spotify.name,
                    genre: response.genre,
                    spotifyUrl: spotify.external_urls.spotify
            });
        } catch (error) {
            next(error)
        }
    }

    static async createCart(req, res, next) {
        const { id } = req.params
        try {
            const findAlbum = await prisma.album.findUnique({
                where: {
                    id: +id
                },
            })
            if(!findAlbum) {
                throw({ name: 'Album not found' })
            } else {
                    const response = await prisma.cart.create({
                        data: {
                            userId: +req.user.id,
                            albumId: +id,
                            status: 'pending'
                        }
                    })
                    res.status(201).json(response)
            }
        } catch (error) {
            next(error)
        }
    }

    static async viewMyCart(req, res, next) {
        try {
            const response = await prisma.cart.findMany({
                where: {
                    userId: +req.user.id,
                    status: 'pending'
                },
                include: {
                    album: true
                }
            })
            if(!response) {
                throw ({name: 'Cart not found'})
            }
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async buyAll(req, res, next) {
        try {
            const response = await prisma.cart.findMany({
                where: {
                    userId: +req.user.id,
                    status: 'pending'
                },
                include: {
                    album: true
                }
            })
            if(!response) {
                throw ({name: 'Cart not found'})
            }
            const totalPrice = response.reduce((acc, curr) => {
                return acc + curr.album.price
            }, 0)
            const User = await prisma.user.findUnique({
                where : {
                    id: +req.user.id
                }
            })
            console.log(User.id)
            const xenditInvoice = await XenditInvoice.createInvoice(User.id+'', totalPrice, User)
            console.log(xenditInvoice)
            const updateCart = await prisma.cart.updateMany({
                where: {
                    userId: +req.user.id,
                    status: 'pending'
                },
                data: {
                    status: 'paid'
                }
            })
            res.status(200).json(xenditInvoice.invoice_url)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ShopController;