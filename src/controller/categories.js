const createError = require("http-errors")
const response = require("../helper/response")
const {getData,getName,getAll,insertData,updateData, deleteData} = require("../model/categories")

module.exports.getCategories = async (req, res, next) => {
    try {
        const id = req.params.id
        if (!id) {
            const {
                rows
            } = await getAll()
            return response(res, rows, 200, "GET DATA SUCCESS")
        }
        const {
            rows
        } = await getData(id)
        const {
            rows: [{
                name
            }]
        } = await getName(id)
        let data = {
            category: name,
            products: [...rows]
        }
        console.log(data)
        return response(res, data, 200, "GET PRODUCT FROM CATEGORY SUCCESS")
    } catch (error) {
        return next(createError.InternalServerError())
    }
}
module.exports.insertCateogories = async (req, res, next) => {
    try {
        const { id,name } = req.body
        const { rowCount } = await insertData(id, name)
        if (!rowCount) {
            return next(createError(500, "FAILED INSERT DATA"))
        }
        response(res, req.body, 200, "INSERT DATA SUCCESS")
    } catch (error) {
        return next(createError.InternalServerError())
    }

}

module.exports.updateCategories = async (req, res, next) => {
    try {
        const id = req.params.id
        const { name } = req.body
        const { rowCount } = await updateData(id, name)
        if(!rowCount){
            return response(res, [] , 200, "FAILED UPDATE DATA")
        }
        response(res, [id,name] ,200, "SUCCESS UPDATE DATA")
   } catch (error) {
        return next(createError.InternalServerError())        
    }
}
module.exports.deleteCategories = async (req, res, next) => {
    try {
        const id = req.params.id
        const { rowCount } = await deleteData(id)
        if(!rowCount){
            return response(res, [] , 200, "FAILED DELETE DATA")
        }
        response(res, [] ,200, "SUCCESS DELETE DATA")
    } catch (error) {
        console.log(error)
        return next(createError.InternalServerError())
    }
}