const Payment = require('../models/Payment');

exports.createPayment = async (req, res) => {

    try {
        const payment = await Payment.create(req.body);
        res.json(payment);
    } catch (error) {
        console.error("ERROR PAYMENT:", error.message);
        res.status(400).json({
            message: "Error creando pago",
            error: error.message
        });
    }
};

exports.getPayments = async (req, res) => {

    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (error) {
        res.status(500).json({
            message: "Error obteniendo pagos"
        });
    }
};
