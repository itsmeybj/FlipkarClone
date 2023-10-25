const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        require : true,
        unique:true
    },
    mobile : {
        type : String,
        require : true,
    }, 
    password : {
        type : String,
        require : true,
    },
})

const validate = (user)=>{
    const schema = Joi.object({
        //name:Joi.string().min(3).max(10).required(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password:passwordComplexity().required(),
        mobile:Joi.string().required(),
        //gender:Joi.string().valid("male","femail","non-binary").required()
    });
    return schema.validate(user)
}

const validateLogin = (user)=>{
    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password:Joi.string().required(),       
    });
    return schema.validate(user)
}

userSchema.methods.isPasswordMatched=async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.pre("save",async function(next){
    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password,salt)
    next();
})

const User = new mongoose.model("User",userSchema)
module.exports = {User,validate,validateLogin}
