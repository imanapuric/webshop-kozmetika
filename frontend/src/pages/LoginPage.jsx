import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../style/login.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [lozinka, setLozinka] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        api.post("/auth/login", { email, lozinka })
            .then((res) => {
                login(res.data.korisnik);
                // redirekcija na osnovu uloge
                const role = res.data.korisnik?.uloga?.toUpperCase();
                if (role === "ADMIN") navigate("/dashboard");
                else navigate("/shop");
            })
            .catch((err) => {
                setError(err.response?.data?.poruka || "Greška pri prijavi");
            });
    };

    return (

        <div className="login-page">
            <div className="login-left">
                <h1 className="brand">Roséa</h1>
                <p className="subtitle">BEAUTY ADMIN PANEL</p>

                <p className="description">
                    Dobro došli!<br />
                    Prijavite se kako biste upravljali proizvodima,
                    narudžbama i sadržajem Roséa web prodavnice.
                </p>
            </div>

            <div className="login-right">
                <div className="login-card">
                    <h2 className="card-title">Prijava</h2>

                    {error && <p className="error">{error}</p>}

                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            placeholder="Lozinka"
                            value={lozinka}
                            onChange={(e) => setLozinka(e.target.value)}
                            required
                        />

                        <button type="submit">Prijavi se</button>
                    </form>
                </div>
            </div>
        </div>

);
};

export default LoginPage;
