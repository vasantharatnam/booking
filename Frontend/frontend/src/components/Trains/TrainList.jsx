import React, { useState } from 'react';
import { getSeatAvailability } from '../../services/api';

const TrainList = () => {
    const [search, setSearch] = useState({ source: '', destination: '' });
    const [trains, setTrains] = useState([]);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setSearch({ ...search, [e.target.name]: e.target.value });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await getSeatAvailability(search);
            setTrains(response.data.trains);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch trains.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl mb-4">Search Trains</h2>
            {error && <p className="text-red-500">{error}</p>}
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
                                <button className="bg-green-500 text-white px-3 py-1 rounded">Book</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TrainList;
