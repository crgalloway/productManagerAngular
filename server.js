// Definitions ==>
const express = require('express')
const app = express()
const port = 8000;

const path = require('path')

const bp = require('body-parser')
app.use(bp.json())
app.use(express.static(__dirname+'/client/dist'))

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/items')
//<== end definitions

// Schemas ==>

//<== end schemas

// Routes ==>
app.all("*", (req,res,next)=>{
	res.sendFile(path.resolve("./authors-app/dist/index.html"))
})
//<== end routes

// Listening ==>
app.listen(port, function(){
	console.log('Listening on port:',port)
})