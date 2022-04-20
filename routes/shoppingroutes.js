const express = require('express')
const router = express.Router()
const ShopController = require('../Controller/shopController')

router.get('/', ShopController.getAll)
router.get('/:id', ShopController.detailAlbum)
router.post('/:id', ShopController.createCart)
router.get('/mycart', ShopController.viewMyCart)
router.patch('/mycart', ShopController.buyAll)

module.exports = router