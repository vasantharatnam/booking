const jwt = require('jsonwebtoken');
const { User } = require('../utils/db').sequelize.models;
require('dotenv').config();

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

// Register a new user
exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Create user
        const user = await User.create({
            username,
            email,
            password_hash: password,
        });

        // Generate token
        const token = generateToken(user);

        res.status(201).json({
            message: 'User registered successfully.',
            token,
        });
    } catch (error) {
        next(error);
    }
};

// Login user
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Validate password
        const isValid = await user.validPassword(password);
        if (!isValid) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Generate token
        const token = generateToken(user);

        res.status(200).json({
            message: 'Login successful.',
            token,
        });
    } catch (error) {
        next(error);
    }
};
