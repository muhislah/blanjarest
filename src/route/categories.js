const express = require("express")
const { getCategories, insertCateogories, updateCategories, deleteCategories } = require("../controller/categories")
const router = express.Router()


router
    .get('/:id?', getCategories)
    .post('/', insertCateogories)
    .put('/:id', updateCategories)
    .delete('/:id', deleteCategories)

module.exports = router