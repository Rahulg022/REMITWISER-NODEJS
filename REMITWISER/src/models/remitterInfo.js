const mongoose = require("mongoose");

const remitterInfoSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    phonenumber: { type: String, required: true },
    pannumber: { type: String, required: true },
    purpose: { type: String, required: true },
    dob: { type: Date, required: true },
    address: { type: String, required: true },
    postalcode: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    bankname: { type: String, required: true },
    accountnumber: { type: String, required: true },
    ifsc: { type: String, required: true },
});

const RemitterInfoModel = mongoose.model("RemitterInfo", remitterInfoSchema);
module.exports = RemitterInfoModel;
