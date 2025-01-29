const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
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

    return Train;
};
