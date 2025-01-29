import React, { useState } from 'react';
import { addTrain } from '../../services/api';

const AddTrain = () => {
    const [form, setForm] = useState({
        train_number: '',
        source: '',
        destination: '',
        departure_time: '',
        arrival_time: '',
        total_seats: 0,
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addTrain(form);
            setMessage(response.data.message);
            setError('');
            setForm({
                train_number: '',
                source: '',
                destination: '',
                departure_time: '',
                arrival_time: '',
                total_seats: 0,
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add train.');
            setMessage('');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl mb-4">Add New Train</h2>
            {message && <p className="text-green-500">{message}</p>}
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="train_number"
                    placeholder="Train Number"
                    value={form.train_number}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
                <input
                    type="text"
                    name="source"
                    placeholder="Source Station"
                    value={form.source}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
                <input
                    type="text"
                    name="destination"
                    placeholder="Destination Station"
                    value={form.destination}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
                <input
                    type="datetime-local"
                    name="departure_time"
                    placeholder="Departure Time"
                    value={form.departure_time}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
                <input
                    type="datetime-local"
                    name="arrival_time"
                    placeholder="Arrival Time"
                    value={form.arrival_time}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
                <input
                    type="number"
                    name="total_seats"
                    placeholder="Total Seats"
                    value={form.total_seats}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
                <button type="submit" className="w-full bg-purple-500 text-white py-2 rounded">Add Train</button>
            </form>
        </div>
    );
};

export default AddTrain;
