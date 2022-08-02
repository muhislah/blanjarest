const bcrypt = require('bcrypt')
const { v4: uuid } = require('uuid')
const { searchUser, registerUser, activateUser, updateUser } = require('../model/users')
const response = require('../helper/response')
const createError = require('http-errors')
const { generateJWT, verifyJWT, generateAccessToken, generateRefreshToken } = require('../helper/jwt')
const sendMail = require('../helper/mail')

module.exports.registerUser = async (req, res, next) => {
    const { fullname,email,password, role} = req.body
    try {
        const users = {}
        users.id = uuid()
        users.fullname = fullname
        users.email = email
        users.password =  await bcrypt.hash(password, 10)
        users.role = role
        users.storename = req.body.storename || null
        users.phone = req.body.phone || null
        users.status = 'Pending'
        const { rowCount } = await searchUser(email)
        if (rowCount){
            return response(res, [], 200, "EMAIL HAS BEEN REGISTERED")
        }
        const { rowCount : register } = await registerUser(users)
        if (!register){
            return response(res, [], 200, "FAILED REGISTER USER")
        }
        const token = await generateJWT(email)
        await sendMail(email, token, fullname)
        response(res, [] , 200, "REGISTER SUCCESS PLEASE CHECK THE EMAIL FOR ACTIVATION" )
    } catch (error) {
        console.log(error)
        next(createError.InternalServerError())
    }
}

module.exports.verifyUser = async (req, res, next) => {
    try {
        const token = req.params.token
        const payload = await verifyJWT(token)
        const { rowCount } = await activateUser(payload)
        if (!rowCount){
            return response(res, [] , 200, "ACTIVATION FAILED")
        }
        res.redirect('http://localhost:3000/verify')
        response(res, [] , 200, "ACTIVATION SUCCESS")
    } catch (error) {
        next(createError.InternalServerError())
    }
    
}

module.exports.loginUser = async (req, res,next) => {
    try {
        const { email, password } = req.body
        const {rows : [rows]} = await searchUser(email)
        if (!rows){
            return response(res, [] , 200, "EMAIL OR PASSWORD WRONG")
        }
        const hashedPassword = rows.password
        const result = await bcrypt.compare(password, hashedPassword)
        if (!result){
            return response(res, [] , 200, "EMAIL OR PASSWORD WRONG")
        }
        console.log(rows)
        if (rows.status === "Pending"){
            return response(res, [], 500, "YOUR ACCOUT MUST BE ACTIVATE")
        }
        const data = {
            email : rows.email,
            accessToken : await generateAccessToken(rows.id, rows.email, rows.role),
            refreshToken : await generateRefreshToken(rows.id, rows.email, rows.role)
        }
        response(res, data , 200, "LOGIN SUCCESS")
    } catch (error) {
        console.log(error)
        next(createError.InternalServerError())
    }
}

module.exports.refreshToken = async (req, res, next) => {
    try {
        const {refreshToken} = req.body
        const payload = await verifyJWT(refreshToken)
        if (payload.type != "refresh-token"){
            return response(res, [] , 200, "TOKEN WRONG")
        }
        const data = {
            email : payload.email,
            accessToken : await generateAccessToken(payload.email , payload.role),
            refreshToken : await generateRefreshToken(payload.email , payload.role)
        }
        response(res, data, 200, "GET NEW TOKEN SUCCESS")
    } catch (error) {
        console.log(error)
        next(createError.InternalServerError())
    }
}

module.exports.updateProfile = async (req,res,next) => {
    try {
        const id = req.payload.id
        const body = req.body
        const photo = req?.file?.path 
        const { rowCount } = await updateUser({photo, id, ...body})
        if(!rowCount) {
            return response(res, [], 200, 'UPDATE PROFILE FAILED')
        }
        response(res, { photo, id, ...body } , 200, 'UPDATE PROFILE SUCCESS')
    } catch (error) {
        console.log(error)
    }
}

module.exports.getProfile = async (req, res, next) => {
    try {
        const payload = req.payload
        const {id, email, type} = payload 
        if (type != "access-token"){
           return response(res, [] ,200 , "TOKEN WRONG")
        }
        const {rows : [data]} = await searchUser(email)
        delete data.password
        response(res, data, 200, "GET PROFILE SUCCESS")
    } catch (error) {
        console.log(error)
        next(createError.InternalServerError())
    }
}