const express = require("express")
const { getCheckout, addCheckout, deleteCheckout } = require("../controller/checkout")
const { auth } = require("../middleware/auth")
const router = express.Router()


router
    .get('/', auth , getCheckout)
    .post('/', auth, addCheckout)
    .delete('/:id', deleteCheckout)

module.exports = router