import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/api',
});

// Add a request interceptor to include the token
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const addTrain = (data) => API.post('/trains', data);
export const getSeatAvailability = (params) => API.get('/trains/availability', { params });
export const bookSeat = (data) => API.post('/bookings', data);
export const getBookingDetails = (id) => API.get(`/bookings/${id}`);

// Additional API functions as needed
