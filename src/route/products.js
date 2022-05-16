const express = require("express");
const { getData, insertData, updateData, deleteData } = require("../controller/products");
const upload = require("../middleware/upload");
const router = express.Router()


router
    .get('/:id?', getData)
    .post('/', upload.array('photo',12) , insertData)
    .put('/:id', updateData)
    .delete('/:id', deleteData)

module.exports = router