const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected...');
        // Initialize models
        const User = require('../models/User')(sequelize);
        const Train = require('../models/Train')(sequelize);
        const Booking = require('../models/Booking')(sequelize);

        // Define relationships
        User.hasMany(Booking, { foreignKey: 'user_id' });
        Train.hasMany(Booking, { foreignKey: 'train_id' });
        Booking.belongsTo(User, { foreignKey: 'user_id' });
        Booking.belongsTo(Train, { foreignKey: 'train_id' });

        // Sync models
        await sequelize.sync({ alter: true });
        console.log('Models synchronized.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, connectDB };
