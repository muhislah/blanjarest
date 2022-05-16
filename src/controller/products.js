const createError = require("http-errors")
const response = require("../helper/response")
const { countData, getData , insertData, getDetail, updateData, deleteData } = require("../model/products")

module.exports.getData = async (req, res, next) => {
    const id = +req.params.id
    if (!id) {
        try {
            const search = req.query.search || undefined
            const orderby = req.query.sortby || "id"
            const order = req.query.sort || "ASC"
            const limit = +req.query.limit || 5
            const page = +req.query.page || 1
            const offset = (page - 1) * limit
            const { rows : [{ total }]} = await countData(search)
            const { rows } = await getData({search, orderby, order, limit, offset})
            const pagination = {
                totalData : +total,
                totalPage : Math.ceil(total/limit),
                page : page,
                limit : limit
            }
            return response(res, rows, 200, "GET DATA SUCCESS", pagination, search)
        } catch (error) {
            console.log(error)
            console.log("Error Getting data From Database")
            return response(res, null, 500, "GET DATA FAILED")
        }
    }
    try {
        const { rows, rowCount } = await getDetail(id)
        if (!rowCount){
            return response(res, rows, 200, "NO DATA WITH THAT ID")
        }
        response(res, rows, 200, "GET DETAIL DATA SUCCESS")
    } catch ( error ) {
        console.log(error)
        return next(createError(400, "GET DATA FAILED"))
    }
}

module.exports.insertData = async (req,res,next) => {
    try {
        let photo = req.files.map((data) => {
            return data.filename
        })
        console.log(photo)
        const data = {
            ...req.body,
            photo : photo
        }
        const { rowCount } = await insertData(data)
        if (!rowCount){
            return response(res, [] , 500, "INSERT DATA FAILED TO DB")
        }
        return response(res, data , 200, "INSERT DATA SUCCESS")
    } catch (error) {
        console.log(error)
        return next(createError.InternalServerError())
    }
}

module.exports.updateData = async(req, res, next) => {
    try {
        const id = +req.params.id
        const {name, description, price, stock, category_id } = req.body
        const data = {id, ...req.body}
        const { rowCount } = await updateData({name, description, price, stock, category_id, id})
        if (!rowCount){
            return response(res, [], 500, "FAILED UPDATE DATA")
        }
        response(res, data, 200, "UPDATE DATA SUCCESS")
    } catch (error) {
        console.log(error)
        next(createError.InternalServerError())
    }
}

module.exports.deleteData = async(req, res, next) => {
    try {
        const id = +req.params.id
        const { rowCount } = await deleteData(id)
        if (!rowCount){
            return response(res, [], 500, "FAILED DELETE DATA")
        }
        response(res, [], 200, "SUCCESS DELETE DATA")
    } catch (error) {
        next(createError.InternalServerError())
    }
}