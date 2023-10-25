const products = require ("./constants/data");

const Product = require("./models/productModel");

const DefaultData = async ()=>{
    console.log(products)
    try{
        const res = await Product.insertMany(products)
        console.log("data imported" + res)

    }catch(error){
        console.log(error.message);
    }
}

module.exports = DefaultData;