// src/components/Bookings/BookingDetails.jsx

import React, { useState, useEffect } from 'react';
import { getBookingDetails } from '../../services/api';
import { useParams } from 'react-router-dom';

const BookingDetails = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await getBookingDetails(id);
                setBooking(response.data.booking);
                setError('');
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch booking.');
            }
        };
        fetchBooking();
    }, [id]);

    if (error) {
        return <p className="text-red-500 text-center mt-10">{error}</p>;
    }

    if (!booking) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
            <h2 className="text-2xl mb-4">Booking Details</h2>
            <p><strong>Booking ID:</strong> {booking.id}</p>
            <p><strong>Train Number:</strong> {booking.Train.train_number}</p>
            <p><strong>Seat Number:</strong> {booking.seat_number}</p>
            <p><strong>Status:</strong> {booking.status}</p>
            <p><strong>Booking Time:</strong> {new Date(booking.booking_time).toLocaleString()}</p>
            <Link to="/trains" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Back to Trains</Link>
        </div>
    );
};

export default BookingDetails;
