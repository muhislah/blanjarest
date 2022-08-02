require('dotenv').config()

const express = require("express");
const response = require('./src/helper/response');
const app =  express()
const morgan = require('morgan')
const cors = require('cors')
const { default: helmet } = require('helmet');
const xss = require('xss-clean')

const productsRouter = require("./src/route/products")
const categoryRouter = require("./src/route/categories")
const usersRouter = require("./src/route/users");
const addressRouter = require('./src/route/address');
const cartRouter = require('./src/route/cart');
const checkoutRouter = require('./src/route/checkout');
const PORT = process.env.PORT || 5000

app.use(express.json())

app.use(cors({
    credentials : true,
    origin : ['http://localhost:3000','https://blanja-frontend-app.vercel.app/']
}))
// app.use(helmet())
// app.use(xss())

app.use(morgan('dev'))

app.use('/img', express.static('./upload'))
app.use('/products', productsRouter)
app.use('/categories', categoryRouter)
app.use('/auth', usersRouter)
app.use('/address', addressRouter)
app.use('/cart', cartRouter)
app.use('/checkout' , checkoutRouter)

app.use((err, req, res, next) => {
    if (!err){
        return next()
    }
    if (err.code === 'LIMIT_FILE_SIZE' ) {
        return response(res, [] , 500, "File Max is 2 MB")
    }
    console.log(err)
    return response(res, [] , err.status, err.message)
})

app.use((req,res) => {
    response(res, [] , 404, "Page Not Found")
})

app.listen(PORT, () => {
    console.log("App Running on Port "+PORT)
})
