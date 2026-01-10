import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [korisnik, setKorisnik] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("korisnik");
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            // parsiranje uloge u uppercase
            if (parsed.uloga) parsed.uloga = parsed.uloga.toUpperCase();
            setKorisnik(parsed);
        }
    }, []);

    const login = (userData) => {
        if (userData.uloga) userData.uloga = userData.uloga.toUpperCase();
        setKorisnik(userData);
        localStorage.setItem("korisnik", JSON.stringify(userData));
    };

    const logout = () => {
        setKorisnik(null);
        localStorage.removeItem("korisnik");
    };

    return (
        <AuthContext.Provider value={{ korisnik, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
