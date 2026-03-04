require('dotenv').config();

const express = require('express');
const app = express();

const { swaggerUi, swaggerSpec } = require('./docs/swagger');

app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/invoices', require('./routes/invoice.routes'));
app.use('/api/payments', require('./routes/payment.routes'));

module.exports = app;
