const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const productSchema = new mongoose.Schema({
    id : {
        type : String,
        require : true,
        unique : true
    },
    url : String,
    detailUrl : String, 
    title : Object,
    price : Object,
    quantity : Number,
    description : String,
    discount : String,
    tagline:String
})


module.exports = new mongoose.model("Product",productSchema)