import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded);
        } else {
            setUser(null);
        }
    }, [token]);

    const login = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
        try {
            const decoded = jwtDecode(token);
            setUser(decoded);
            // Redirect based on the role in the token
            if (decoded.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (err) {
            navigate('/');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
