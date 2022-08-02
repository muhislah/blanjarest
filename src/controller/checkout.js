const createHttpError = require("http-errors")
const response = require("../helper/response")
const { v4: uuid } = require('uuid')
const { getCheckout, addCheckout, deleteCheckout } = require("../model/checkout")

module.exports.getCheckout = async (req, res, next) => {
  try {
    const user_id = req.payload.id
    const { rows } = await getCheckout(user_id)
    if (rows.length <= 0) {
      return response(res, [], 200, 'NO HISTORY FOUND')
    }
    const data = rows.map((data) => {
      return {
        ...data,
        photo : JSON.parse(data.photo)
      }
    })
    response(res, data, 200, 'GET HISTORY SUCCESS')
  } catch (error) {
    console.log(error)
    next(createHttpError.InternalServerError())
  }
}

module.exports.addCheckout = async (req, res, next) => {
  try {
    const data = {
      user_id : req.payload.id,
      id : uuid(),
      stock : req.body.stock,
      status : req.body.status,
      product_id : req.body.product_id,
      address_id : req.body.address_id
    }
    const { rowCount } = await addCheckout(data)
    if (!rowCount) {
      return response(res, [], 200, 'ADD HISTORY FAILED')
    }

    response(res, data , 200, 'ADD HISTORY SUCCESS')
  } catch (error) {
    console.log(error)
    next(createHttpError.InternalServerError())
  }
}

module.exports.deleteCheckout = async (req,res,next) => {
  try {
    const id = req.params.id
    const { rowCount } = await deleteCheckout(id)
    if (!rowCount) {
      return response(res, [], 200, 'DELETE HISTORY FAILED')
    }
    response(res, [] , 200, 'DELETE HISTORY SUCCESS')
  } catch (error) {
    console.log(error)
    next(createHttpError.InternalServerError())
  }
}