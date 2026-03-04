const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashed
        });

        // No devolver password
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });

    } catch (error) {
        // Email duplicado
        if (error.code === 11000) {
            return res.status(400).json({
                message: 'El email ya está registrado'
            });
        }

        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token });

    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
};