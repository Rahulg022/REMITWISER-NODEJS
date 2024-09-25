// src/models/register.js
const mongoose = require("mongoose");

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
    }
});

const RemitUser = mongoose.model("RemitUser", remituserSchema);
module.exports = RemitUser;
