const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const {
    createInvoice,
    getInvoices
} = require('../controllers/invoice.controller');

/**
 * @swagger
 * /api/invoices:
 *   post:
 *     summary: Crear una factura
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - client
 *               - amount
 *             properties:
 *               client:
 *                 type: string
 *               amount:
 *                 type: number
 *               status:
 *                 type: string
 *                 example: PENDING
 *     responses:
 *       200:
 *         description: Factura creada
 *       401:
 *         description: No autorizado
 *
 *   get:
 *     summary: Obtener todas las facturas
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de facturas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   client:
 *                     type: string
 *                   amount:
 *                     type: number
 *                   status:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 */
router.post('/', auth, createInvoice);
router.get('/', auth, getInvoices);

module.exports = router;