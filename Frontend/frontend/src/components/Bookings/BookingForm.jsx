import React, { useState } from 'react';
import { bookSeat } from '../../services/api';

const BookingForm = ({ trainId,onResult }) => {
    const [seatNumber, setSeatNumber] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await bookSeat({ train_id: trainId, seat_number: parseInt(seatNumber) });
          setMessage(response.data.message);
          setError('');
          // Pass the successful booking message back to the TrainList component
          if (onResult) {
            onResult(response.data.message, false);
          }
        } catch (err) {
          const errMsg = err.response?.data?.message || 'Booking failed.';
          setError(errMsg);
          setMessage('');
          // Pass the error message back to the TrainList component
          if (onResult) {
            onResult(errMsg, true);
          }
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
