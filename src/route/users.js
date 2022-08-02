const express = require('express')
const { registerUser , verifyUser, loginUser, getProfile, refreshToken, updateProfile } = require('../controller/users')
const { auth } = require('../middleware/auth')
const { upload } = require('../middleware/cloudinaryUpload')
const router = express.Router()

router
    .post('/register', registerUser)
    .get('/verify/:token', verifyUser)
    .post('/login', loginUser)
    .get('/profile', auth , getProfile )
    .put('/profile', auth, upload.single('photo'), updateProfile)
    .post('/refresh-token', refreshToken)

module.exports = router
