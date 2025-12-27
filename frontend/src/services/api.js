import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// add request interceptor to include role header if available
api.interceptors.request.use((config) => {
    try {
        const stored = localStorage.getItem('korisnik');
        if (stored) {
            const korisnik = JSON.parse(stored);
            if (korisnik.uloga) {
                config.headers['x-uloga'] = korisnik.uloga.toUpperCase();
            }
        }
    } catch (e) {
        // ignore
    }
    return config;
});

export default api;
