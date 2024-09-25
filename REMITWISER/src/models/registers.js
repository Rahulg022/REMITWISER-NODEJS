// src/models/register.js
const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const remituserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)+[a-zA-Z]{2,7})$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    pannumber: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    postalcode: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
});

//jwt auth

remituserSchema.methods.generateAuthToken = async function(){
    try {
        //console.log(this._id)
        const token = jwt.sign({_id:this._id.toString()},"process.env.SECRET_KEY");
        this.tokens=this.tokens.concat({token:token})
        await this.save();
        return token;
    } catch (error) {
        res.send("the error part"+ error);
        //console.log("the error part"+error);
    }
}



//secure password

remituserSchema.pre("save",async function(next){
    if (this.isModified("password")){
this.password = await bcrypt.hash(this.password,10);
    }

    next();

})




const RemitUser = mongoose.model("RemitUser", remituserSchema);
module.exports = RemitUser;
