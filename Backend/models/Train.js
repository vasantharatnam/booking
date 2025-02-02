const { sequelize } = require('../utils/db');
const { DataTypes } = require('sequelize');
// const Booking = require('../models/Booking')(sequelize);

module.exports = () => {
    const Train = sequelize.define('Train', {
        train_number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        source: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        destination: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        departure_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        arrival_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        total_seats: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        available_seats: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'Trains',
        timestamps: true,
    });

    // Association method
    Train.associate = (models) => {
        // One train can have many bookings
        Train.hasMany(models.Booking, { foreignKey: "train_id" });
        // Train.hasMany(Booking, { foreignKey: "train_id" });
    };

    return Train;
};
