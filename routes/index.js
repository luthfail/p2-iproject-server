const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication');
const userRoutes = require('./userroutes');
const shopRoutes = require('./shoppingroutes')

router.use('/users', userRoutes)

router.use(auth)

router.use('/albums', shopRoutes)

module.exports = router