const express =  require('express')
const app =  express()

app.get('/id=:id&data=:data', (req,res) => {
   const params = req.params
   res.json(params)
})


app.listen(5000)