const createHttpError = require("http-errors")
const response = require("../helper/response")
const { getCart, addCart, updateCart, deleteCart, searchCart } = require("../model/cart")
const { v4: uuid } = require('uuid')

module.exports.getCart = async (req, res, next) => {
  try {
    const user_id = req.payload.id
    const { rows } = await getCart(user_id)
    if (rows.length <= 0) {
      return response(res, [], 200, 'NO CART FOUND')
    }
    const data = rows.map((data) => {
      return {
        ...data,
        photo : JSON.parse(data.photo)
      }
    })
    response(res, data, 200, 'GET CART SUCCESS')
  } catch (error) {
    console.log(error)
    next(createHttpError.InternalServerError())
  }
}

module.exports.addCart = async (req, res, next) => {
  try {
    const data = {
      user_id : req.payload.id,
      id : uuid(),
      stock : req.body?.stock,
      product_id : req.body.product_id
    }
    console.log(data)
    const { rows : same } = await searchCart(data.product_id)
    if(same?.length > 0){
      console.log(same)
      const { rowCount } = await updateCart(same[0].id, data?.stock ?  (same[0].stock + data.stock) : ( same[0].stock + 1))
      if (!rowCount) {
        return response(res, [], 200, 'ADD CART FAILED')
      }
      response(res, data , 200, 'ADD STOCK TO EXITING CART')
    }else {
      const { rowCount } = await addCart(data)
      if (!rowCount) {
        return response(res, [], 200, 'ADD CART FAILED')
      }
      response(res, data , 200, 'ADD CART SUCCESS')
    }
    
  } catch (error) {
    console.log(error)
    next(createHttpError.InternalServerError())
  }
}

module.exports.updateCart = async (req, res, next) => {
  try {
    const stock = +req.body.stock
    const id = req.params.id
    const { rowCount } = await updateCart(id, stock)
    if (!rowCount) {
      return response(res, [], 200, 'UPDATE CART FAILED')
    }
    response(res, [] , 200, 'UPDATE CART SUCCESS')
  } catch (error) {
    console.log(error)
    next(createHttpError.InternalServerError())
  }
}

module.exports.deleteCart = async (req,res,next) => {
  try {
    const id = req.params.id
    const { rowCount } = await deleteCart(id)
    if (!rowCount) {
      return response(res, [], 200, 'DELETE CART FAILED')
    }
    response(res, [] , 200, 'DELETE CART SUCCESS')
  } catch (error) {
    console.log(error)
    next(createHttpError.InternalServerError())
  }
}