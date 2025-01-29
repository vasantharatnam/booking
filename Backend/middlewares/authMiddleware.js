const jwt = require('jsonwebtoken');
const { User } = require('../utils/db').sequelize.models;
require('dotenv').config();

exports.authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findByPk(decoded.id);
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid Token' });
        }
    } else {
        return res.status(401).json({ message: 'No Token Provided' });
    }
};
