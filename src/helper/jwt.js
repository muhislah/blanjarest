const jwt = require('jsonwebtoken')

const generateJWT = async (email) => {
    const payload = {
        email : email,
        status : 'active'
    }
    const options = {
        algorithm: 'HS256',
        expiresIn : '1h'
    }
    const result = await jwt.sign(payload, process.env.SIGNATURE_KEY , options)
    console.log(result)
    return result
}

const generateAccessToken = async (id, email, role) => {
    const payload = {
        id,
        email,
        role,
        type : "access-token"
    }
    const options = {
        algorithm: 'HS256',
        expiresIn : '1h'
    }
    const result = await jwt.sign(payload, process.env.SIGNATURE_KEY , options)
    return result
}

const generateRefreshToken = async (id, email, role) => {
    const payload = {
        id,
        email,
        role,
        type : "refresh-token"
    }
    const options = {
        algorithm: 'HS256',
        expiresIn : '1d'
    }
    const result = await jwt.sign(payload, process.env.SIGNATURE_KEY , options)
    return result
}

const verifyJWT = async (token) => {
    const result = await jwt.verify(token, process.env.SIGNATURE_KEY)
    return result
}

module.exports = {generateJWT, verifyJWT , generateAccessToken , generateRefreshToken}