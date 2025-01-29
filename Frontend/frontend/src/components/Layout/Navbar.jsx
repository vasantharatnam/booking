import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-gray-800 p-4 text-white">
            <div className="max-w-6xl mx-auto flex justify-between">
                <Link to="/" className="font-bold">Train Booking</Link>
                <div className="space-x-4">
                    {user ? (
                        <>
                            {user.role === 'admin' && <Link to="/admin" className="hover:underline">Admin</Link>}
                            <Link to="/trains" className="hover:underline">Trains</Link>
                            <button onClick={logout} className="hover:underline">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:underline">Login</Link>
                            <Link to="/register" className="hover:underline">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
