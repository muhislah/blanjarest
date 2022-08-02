// const multer = require('multer')

// const storage =  multer.memoryStorage()

// const multerUploads = multer({ storage }).fields([{
//     name: 'image', maxCount: 1
// }, {
//     name: 'video', maxCount: 1
// }])
// module.exports = { multerUploads }

const createError = require('http-errors')
const multer = require('multer')
const { storage } = require('../config/cloudinary')

const upload = multer({
    storage : storage,
    limits: {
        fileSize: 1024 * 1024 * 2 // Accept files to 2mb only
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(createError(500, "Image Allowed Only JPG/PNG"));
        }
    }
})

module.exports = { upload }