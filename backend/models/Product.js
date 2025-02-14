const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema(
    {
        title:{type:String, required:true},
        description:{type:String, required:true},
        price:{type:Number, required:true},
        color:{type:String, required:false},
    }
);

module.exports = mongoose.model("Product", ProductSchema)