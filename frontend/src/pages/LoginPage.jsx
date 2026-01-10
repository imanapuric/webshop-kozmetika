import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

import "../style/login.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [lozinka, setLozinka] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // preusmjeravanje korisnika ovisno o ulozi nakon uspješne prijave
        api.post("/auth/login", { email, lozinka })
            .then((res) => {
                login(res.data.korisnik);
                const role = res.data.korisnik?.uloga?.toUpperCase();
                if (role === "ADMIN") navigate("/dashboard");
                else navigate("/shop");
            })
            .catch((err) => {
                setError(err.response?.data?.poruka || "Greška pri prijavi");
            });
    };

    return (
        <div className="login-wrapper">
            <div className="login-box">

                <div className="login-image">
                    <img src={require("../picture/flower.jpg")} alt="Login visual" />
                </div>

                <div className="login-form">
                    <h2>Prijava</h2>

                    {error && <p className="error">{error}</p>}

                    <form onSubmit={handleSubmit}>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Unesite email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label>Lozinka</label>
                        <input
                            type="password"
                            placeholder="Unesite lozinku"
                            value={lozinka}
                            onChange={(e) => setLozinka(e.target.value)}
                            required
                        />
                        <button type="submit">Prijava</button>
                    </form>
                    <p className="auth-switch">
                        Nemate račun? <Link to="/register">Registrujte se</Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;
