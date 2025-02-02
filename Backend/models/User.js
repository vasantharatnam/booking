const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');
const bcrypt = require('bcryptjs');

module.exports = () => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true },
        },
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('admin', 'user'),
            defaultValue: 'user',
        },
    }, {
        tableName: 'Users',
        timestamps: true,
        hooks: {
            beforeCreate: async (user) => {
                const salt = await bcrypt.genSalt(10);
                user.password_hash = await bcrypt.hash(user.password_hash, salt);
            },
        },
    });

    // Association method
    User.associate = (models) => {
        // One user can have many bookings
        User.hasMany(models.Booking, { foreignKey: "user_id" });
    };

    User.prototype.validPassword = async function(password) {
        return await bcrypt.compare(password, this.password_hash);
    };

    return User;
};
