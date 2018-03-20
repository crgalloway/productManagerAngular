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
var ItemSchema = new mongoose.Schema({
	title: {type:String, minlength: 4, required:true},
	price: {type:Number, required: true},
	url: {type:String, default:"https://www.pdclipart.org/albums/Symbols_and_Shapes/camera_icon_BW.png"}
}, {timestamps:true})
mongoose.model('Item', ItemSchema)
var Item = mongoose.model('Item')
//<== end schemas

// Routes ==>
app.get('/items', function(req,res){
	Item.find({}, function(err, items){
		if(err){
			res.json({message: "Error", error: err})
		}
		else {
			res.json({message: "Success", data: items})
		}
	})
})

app.get('/items/:id', function(req,res){
	Item.findOne({_id: req.params.id}, function(err, item){
		if(err){
			res.json({message: "Error", error: err})
		}
		else {
			res.json({message: "Success", data: item})
		}
	})
})

app.post('/items', function(req,res){
	var item = new Item({title:req.body.title, price:req.body.price, url:req.body.url})
	item.save(function(err){
		if(err){
			res.json({message: "Error", error: err})
		}
		else{
			res.json({message: "Success"})
		}
	})
})

app.put('/items/:id', function(req,res){
	var item = Item.update({_id: req.params.id}, {title:req.body.title, price:req.body.price, url:req.body.url}, function(err){
		if(err){
			res.json({message: "Error", error: err})
		}
		else{
			res.json({message:"Success"})
		}
	})
})

app.delete('/items/:id', function(req,res){
	Item.remove({_id: req.params.id}, function(err){
		if(err){
			res.json({message: "Error", error: err})
		}
	})
})
app.all("*", (req,res,next)=>{
	res.sendFile(path.resolve("./client/dist/index.html"))
})
//<== end routes

// Listening ==>
app.listen(port, function(){
	console.log('Listening on port:',port)
})