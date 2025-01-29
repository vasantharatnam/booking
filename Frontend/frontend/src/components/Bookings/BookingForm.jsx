import React, { useState } from 'react';
import { bookSeat } from '../../services/api';

const BookingForm = ({ trainId }) => {
    const [seatNumber, setSeatNumber] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await bookSeat({ train_id: trainId, seat_number: parseInt(seatNumber) });
            setMessage(response.data.message);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Booking failed.');
            setMessage('');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl mb-4">Book a Seat</h2>
            {message && <p className="text-green-500">{message}</p>}
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="number"
                    name="seat_number"
                    placeholder="Seat Number"
                    value={seatNumber}
                    onChange={(e) => setSeatNumber(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Book Seat</button>
            </form>
        </div>
    );
};

export default BookingForm;
