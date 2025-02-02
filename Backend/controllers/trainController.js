const { sequelize } = require('../utils/db');
const Train = require('../models/Train')(sequelize);

// Add a new train (Admin only)
exports.addTrain = async (req, res, next) => {
    try {
        const { train_number, source, destination, departure_time, arrival_time, total_seats } = req.body;

        // Check if train number exists
        const existingTrain = await Train.findOne({ where: { train_number } });
        if (existingTrain) {
            return res.status(400).json({ message: 'Train number already exists.' });
        }

        // Create train
        const train = await Train.create({
            train_number,
            source,
            destination,
            departure_time,
            arrival_time,
            total_seats,
            available_seats: total_seats,
        });

        res.status(201).json({
            message: 'Train added successfully.',
            train,
        });
    } catch (error) {
        next(error);
    }
};

// Get seat availability between two stations
exports.getSeatAvailability = async (req, res, next) => {
    try {
        const { source, destination } = req.query;

        const trains = await Train.findAll({
            where: {
                source,
                destination,
            },
            attributes: ['id', 'train_number', 'departure_time', 'arrival_time', 'available_seats', 'total_seats'],
        });

        res.status(200).json({ trains });
    } catch (error) {
        next(error);
    }
};
