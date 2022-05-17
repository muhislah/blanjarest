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
const PORT = process.env.PORT || 5000

app.use(express.json())

app.use(cors())
app.use(helmet())
app.use(xss())

app.use(morgan('dev'))


app.use('/products', productsRouter)
app.use('/categories', categoryRouter)
app.use('/auth', usersRouter)

app.use((err, req, res, next) => {
    if (!err){
        return next()
    }
    return response(res, [] , err.status, err.message)
})

app.use((req,res) => {
    response(res, [] , 404, "Page Not Found")
})

app.listen(PORT, () => {
    console.log("App Running on Port "+PORT)
})
