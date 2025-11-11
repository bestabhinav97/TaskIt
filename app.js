const express = require('express')
const app = express()
const path = require('path')


app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))
app.use(express.static(path.join(__dirname))) // for root level files
app.use('/model', express.static(path.join(__dirname, "model")))


app.listen(3000,()=>{
    console.log("http://localhost:3000")
})