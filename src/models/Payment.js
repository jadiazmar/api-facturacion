const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    invoiceId: mongoose.Schema.Types.ObjectId,
    method: String,
    amount: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', PaymentSchema);