// src/pages/Home.jsx

import React from 'react';
import TrainList from '../components/Trains/TrainList';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <TrainList />
        </div>
    );
};

export default Home;
