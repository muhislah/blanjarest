const express = require("express")
const { getCategories, insertCateogories, updateCategories, deleteCategories } = require("../controller/categories")
const { isAdmin } = require("../middleware/auth")
const router = express.Router()


router
    .get('/:id?', getCategories)
    .post('/', isAdmin , insertCateogories)
    .put('/:id', isAdmin, updateCategories)
    .delete('/:id',isAdmin, deleteCategories)

module.exports = router