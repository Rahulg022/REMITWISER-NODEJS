const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    currency: {
        type: String,
        required: true
    },
    beneficiaryAmount: {
        type: Number,
        required: true
    },
    amountToPay: {
        type: Number,
        required: true
    },
    relationship: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    remarks: {
        type: String
    }
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
