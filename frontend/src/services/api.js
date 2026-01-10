import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
        'Content-Type': 'application/json'
    }
});
// interceptor će sesiji dodijeliti header sa ulogom korisnika,, kako bi backend mogao da razlikuje privilegije
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
    }
    return config;
});

export default api;
