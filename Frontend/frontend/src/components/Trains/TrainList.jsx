import React, { useState } from 'react';
import { getSeatAvailability } from '../../services/api';
import BookingForm from '../Bookings/BookingForm';

const TrainList = () => {
    const [search, setSearch] = useState({ source: '', destination: '' });
    const [trains, setTrains] = useState([]);
    const [error, setError] = useState('');
    const [bookingMessage, setBookingMessage] = useState('');
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedTrain, setSelectedTrain] = useState(null);

    const handleChange = (e) => {
        setSearch({ ...search, [e.target.name]: e.target.value });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await getSeatAvailability(search);
            setTrains(response.data.trains);
            setError('');
            setBookingMessage('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch trains.');
        }
    };

    // Called when the Book button is clicked for a given train
    const handleBookClick = (train) => {
        setSelectedTrain(train);
        setShowBookingModal(true);
    };

    // Callback passed to BookingForm to receive the booking result
    const handleBookingResult = (msg, isError = false) => {
        if (isError) {
        setBookingMessage(`Error: ${msg}`);
        } else {
        setBookingMessage(msg);
        }
        setShowBookingModal(false);
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl mb-4">Search Trains</h2>
            {error && <p className="text-red-500">{error}</p>}
            {bookingMessage && <p className="text-green-500">{bookingMessage}</p>}
            <form onSubmit={handleSearch} className="flex space-x-4 mb-6">
                <input
                    type="text"
                    name="source"
                    placeholder="Source"
                    value={search.source}
                    onChange={handleChange}
                    required
                    className="flex-1 px-3 py-2 border rounded"
                />
                <input
                    type="text"
                    name="destination"
                    placeholder="Destination"
                    value={search.destination}
                    onChange={handleChange}
                    required
                    className="flex-1 px-3 py-2 border rounded"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
            </form>

            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Train Number</th>
                        <th className="py-2">Departure</th>
                        <th className="py-2">Arrival</th>
                        <th className="py-2">Available Seats</th>
                        <th className="py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {trains.map(train => (
                        <tr key={train.id} className="text-center border-t">
                            <td className="py-2">{train.train_number}</td>
                            <td className="py-2">{new Date(train.departure_time).toLocaleString()}</td>
                            <td className="py-2">{new Date(train.arrival_time).toLocaleString()}</td>
                            <td className="py-2">{train.available_seats}</td>
                            <td className="py-2">
                                <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => handleBookClick(train)}> Book</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for BookingForm */}
            {showBookingModal && selectedTrain && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                {/* Overlay */}
                <div
                    className="absolute inset-0 bg-black opacity-50"
                    onClick={() => setShowBookingModal(false)}
                ></div>
                {/* Modal content */}
                <div className="relative bg-white p-6 rounded shadow-lg z-10 w-full max-w-md">
                    <button
                    onClick={() => setShowBookingModal(false)}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                    >
                    &times;
                    </button>
                    <BookingForm
                    trainId={selectedTrain.id}
                    onResult={handleBookingResult}
                    />
                </div>
                </div>
            )}
        </div>
    );
};

export default TrainList;
