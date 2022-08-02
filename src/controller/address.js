const createHttpError = require('http-errors')
const response = require('../helper/response')
const {getAddress, addAddress, updateAddress, deleteAddress} = require('./../model/address')
const { v4 : uuid} = require('uuid')

module.exports.getAddress = async (req, res, next) => {
  try {
    const user_id = req.payload.id
    const { rows } = await getAddress(user_id)
    if ( !rows ) {
      return response(res, [], 200, 'NO ADDRESS FOUND') 
    }
    response(res, rows, 200, 'GET ADDRESS SUCCESS')
  } catch (error) {
    console.log(error)
    next(createHttpError.InternalServerError())    
  }
}

module.exports.addAddress =  async (req,res, next) => {
  try {
    const body  = req.body
    const user_id = req.payload.id
    const id =  uuid()
    const { rowCount } = await addAddress({id, user_id,  ...body})
    if (!rowCount) {
      return response(res, [], 200, 'INSERT ADDRESS FAILED') 
    }
    response(res, [], 200, "INSERT ADDRESS SUCCESS")
  } catch (error) {
    console.log(error)
    next(createHttpError.InternalServerError()) 
  }
}

module.exports.updateAddress = async (req,res,next) => {
  try {
    const body = req.body
    const id = req.params.id
    const { rowCount } = await updateAddress({id, ...body})
    if (!rowCount) {
      return response(res, [] , 200, 'UPDATE ADDRESS FAILED') 
    }
    response(res, body, 200, "UPDATE ADDRESS SUCCESS")
  } catch (error) {
    console.log(error)
    next(createHttpError.InternalServerError()) 
  }
}

module.exports.deleteAddress = async (req,res,next) => {
  try {
    const id = req.params.id
    const { rowCount } = await deleteAddress(id)
    if (!rowCount) {
      return response(res, { id : id } , 200, 'DELETE ADDRESS FAILED') 
    }
    response(res, [], 200, "DELETE ADDRESS SUCCESS")
  } catch (error) {
    console.log(error)
    next(createHttpError.InternalServerError()) 
  }
}