const { Booking, Train } = require('../utils/db').sequelize.models;
const { sequelize } = require('../utils/db');

// Book a seat with concurrency handling
exports.bookSeat = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
        const { train_id, seat_number } = req.body;
        const user_id = req.user.id;

        // Check if seat is already booked
        const existingBooking = await Booking.findOne({
            where: { train_id, seat_number },
            transaction,
            lock: transaction.LOCK.UPDATE,
        });

        if (existingBooking) {
            await transaction.rollback();
            return res.status(400).json({ message: 'Seat already booked.' });
        }

        // Check if seat number is valid
        const train = await Train.findByPk(train_id, { transaction });
        if (!train) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Train not found.' });
        }

        if (seat_number < 1 || seat_number > train.total_seats) {
            await transaction.rollback();
            return res.status(400).json({ message: 'Invalid seat number.' });
        }

        // Create booking
        const booking = await Booking.create({
            user_id,
            train_id,
            seat_number,
        }, { transaction });

        // Update available seats
        await train.decrement('available_seats', { by: 1, transaction });

        await transaction.commit();

        res.status(201).json({
            message: 'Seat booked successfully.',
            booking,
        });
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};

// Get booking details
exports.getBookingDetails = async (req, res, next) => {
    try {
        const booking_id = req.params.id;
        const user_id = req.user.id;

        const booking = await Booking.findOne({
            where: { id: booking_id, user_id },
            include: ['Train'],
        });

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }

        res.status(200).json({ booking });
    } catch (error) {
        next(error);
    }
};
