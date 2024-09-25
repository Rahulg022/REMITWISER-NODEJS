// src/models/beneficiaryInfo.js
const mongoose = require('mongoose');

const beneficiaryInfoSchema = new mongoose.Schema({
    accountHolderName: {
        type: String,
        required: true
    },
    country: {
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
    address: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true
    },
    bankAddress: {
        type: String,
        required: true
    },
    bankCountry: {
        type: String,
        required: true
    },
    swiftCode: {
        type: String,
        required: true
    }
});

const BeneficiaryInfo = mongoose.model('BeneficiaryInfo', beneficiaryInfoSchema);
module.exports = BeneficiaryInfo;
