// src/pages/BookingsPage.jsx

import React, { useState, useEffect, useContext } from 'react';
import { getBookingDetails } from '../services/api';
import { AuthContext } from '../context/AuthContext';
// import { Link } from 'react-router-dom';

const BookingsPage = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await getBookingDetails(user.id);
                console.log(response.data);
                setBookings(response.data.booking);
                setError('');
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch bookings.');
            }
        };
        if (user) {
            fetchBookings();
        }
    }, [user]);

    if (error) {
        return <p className="text-red-500 text-center mt-10">{error}</p>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 border rounded shadow bg-white">
            <h2 className="text-2xl mb-4">My Bookings</h2>
            {bookings?.length > 0 ? (
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border">Booking ID</th>
                            <th className="py-2 px-4 border">Train ID</th>
                            <th className="py-2 px-4 border">Seat Number</th>
                            <th className="py-2 px-4 border">Status</th>
                            <th className="py-2 px-4 border">Booking Time</th>
                            {/* <th className="py-2 px-4 border">Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking?.id} className="text-center border-t">
                                <td className="py-2 px-4 border">{booking?.id}</td>
                                <td className="py-2 px-4 border">{booking?.train_id}</td>
                                <td className="py-2 px-4 border">{booking?.seat_number}</td>
                                <td className="py-2 px-4 border">{booking?.status}</td>
                                <td className="py-2 px-4 border">{new Date(booking?.createdAt).toLocaleString()}</td>
                                {/* <td className="py-2 px-4 border">
                                    <Link to={`/bookings/${booking.id}`} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">View</Link>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No bookings found.</p>
            )}
        </div>
    );
};

export default BookingsPage;
