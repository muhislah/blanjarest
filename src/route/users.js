const express = require('express')
const { registerUser , verifyUser, loginUser, getProfile, refreshToken } = require('../controller/users')
const auth = require('../middleware/auth')
const router = express.Router()

router
    .post('/register', registerUser)
    .get('/verify/:token', verifyUser)
    .post('/login', loginUser)
    .get('/profile', auth , getProfile )
    .post('/refresh-token', refreshToken)

module.exports = router
