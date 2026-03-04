const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    client: String,
    amount: Number,
    status: { type: String, default: 'PENDING' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);