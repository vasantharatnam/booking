const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

module.exports = () => {
    const Booking = sequelize.define('Booking', {
        seat_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('confirmed', 'cancelled'),
            defaultValue: 'confirmed',
        },
        train_id: { // ✅ Define foreign key
            type: DataTypes.INTEGER,
            allowNull: true, // ✅ Must be NULLABLE because ON DELETE SET NULL
            references: {
                model: 'Trains', // ✅ Should match table name
                key: 'id',
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
        user_id: { // ✅ Define foreign key
            type: DataTypes.INTEGER,
            allowNull: true, // ✅ Must be NULLABLE because ON DELETE SET NULL
            references: {
                model: 'Users', // ✅ Should match table name
                key: 'id',
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    }, {
        tableName: 'Bookings',
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['train_id', 'seat_number']
            }
        ]
    });

    // Association method
    Booking.associate = (models) => {
        // Booking belongs to a user and a train
        Booking.belongsTo(models.User, { foreignKey: "user_id" });
        Booking.belongsTo(models.Train, { foreignKey: "train_id" });
    };

    return Booking;
};
