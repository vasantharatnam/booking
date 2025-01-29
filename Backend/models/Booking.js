const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Booking = sequelize.define('Booking', {
        seat_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('confirmed', 'cancelled'),
            defaultValue: 'confirmed',
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

    return Booking;
};
