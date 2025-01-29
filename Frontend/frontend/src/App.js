// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import TrainsPage from './pages/TrainsPage';
import BookingsPage from './pages/BookingsPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <div className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/admin" element={
                                <ProtectedRoute adminOnly>
                                    <AdminPage />
                                </ProtectedRoute>
                            } />
                            <Route path="/trains" element={
                                <ProtectedRoute>
                                    <TrainsPage />
                                </ProtectedRoute>
                            } />
                            <Route path="/trains/:id" element={
                                <ProtectedRoute>
                                    <TrainsPage />
                                </ProtectedRoute>
                            } />
                            <Route path="/bookings" element={
                                <ProtectedRoute>
                                    <BookingsPage />
                                </ProtectedRoute>
                            } />
                            <Route path="/bookings/:id" element={
                                <ProtectedRoute>
                                    <BookingsPage />
                                </ProtectedRoute>
                            } />
                            {/* Catch-all 404 Route */}
                            <Route path="*" element={<p className="text-center mt-10">Page Not Found</p>} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
