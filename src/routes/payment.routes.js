const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const {
    createPayment,
    getPayments
} = require('../controllers/payment.controller');

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Registrar un pago
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - invoiceId
 *               - method
 *               - amount
 *             properties:
 *               invoiceId:
 *                 type: string
 *               method:
 *                 type: string
 *                 example: TARJETA
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Pago registrado
 *
 *   get:
 *     summary: Obtener lista de pagos
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pagos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               means:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   invoiceId:
 *                     type: string
 *                   method:
 *                     type: string
 *                   amount:
 *                     type: number
 *                   date:
 *                     type: string
 *                     format: date-time
 */
router.post('/', auth, createPayment);
router.get('/', auth, getPayments);

module.exports = router;