const express = require("express")
const { getCart, addCart, updateCart, deleteCart } = require("../controller/cart")
const { auth } = require("../middleware/auth")
const router = express.Router()


router
    .get('/', auth , getCart)
    .post('/', auth, addCart)
    .put('/:id', updateCart)
    .delete('/:id', deleteCart)

module.exports = router