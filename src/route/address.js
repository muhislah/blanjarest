const express = require("express")
const { getAddress, addAddress, updateAddress, deleteAddress } = require("../controller/address")
const { auth } = require("../middleware/auth")
const router = express.Router()


router
    .get('/', auth ,  getAddress)
    .post('/', auth , addAddress)
    .put('/:id', updateAddress)
    .delete('/:id', deleteAddress)

module.exports = router