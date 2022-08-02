const express = require("express");
const { getData, insertData, updateData, deleteData } = require("../controller/products");
const { upload } = require("../middleware/cloudinaryUpload");
const router = express.Router()


router
    .get('/:id?', getData)
    .post('/', upload.array('photo',5) , insertData)
    .put('/:id', upload.array('photo', 5), updateData)
    .delete('/:id', deleteData)

module.exports = router