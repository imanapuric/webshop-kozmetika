import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import "../style/register.css";

const RegisterPage = () => {
    const [ime, setIme] = useState("");
    const [email, setEmail] = useState("");
    const [lozinka, setLozinka] = useState("");
    const [confirm, setConfirm] = useState("");
    const [uloga, setUloga] = useState("KORISNIK");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (lozinka !== confirm) {
            setError("Lozinke se ne podudaraju");
            return;
        }

        setLoading(true);

        api.post("/auth/register", { ime, email, lozinka, uloga })
            .then(() => {
                navigate("/login");
            })
            .catch((err) => {
                setError(err.response?.data?.poruka || "Greška pri registraciji");
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="register-wrapper">
            <div className="register-box">

                <div className="register-image">
                    <img src={require("../picture/flower.jpg")} alt="Register visual" />
                </div>

                <div className="register-form">
                    <h2>Registracija</h2>

                    {error && <p className="error">{error}</p>}

                    <form onSubmit={handleSubmit}>
                        <label>Ime i Prezime</label>
                        <input
                            type="text"
                            placeholder="Unesite vaše ime"
                            value={ime}
                            onChange={(e) => setIme(e.target.value)}
                            required
                        />

                        <label>Email Adresa</label>
                        <input
                            type="email"
                            placeholder="ime@primjer.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label>Lozinka</label>
                        <input
                            type="password"
                            placeholder="Najmanje 6 karaktera"
                            value={lozinka}
                            onChange={(e) => setLozinka(e.target.value)}
                            required
                            minLength={6}
                        />

                        <label>Potvrdite Lozinku</label>
                        <input
                            type="password"
                            placeholder="Ponovite lozinku"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            required
                        />
                        {/* ovaj dio očito nije siguran za real world projekat, ali ovdje može poslužiti */}
                        <label>Tip računa</label>
                        <select value={uloga} onChange={(e) => setUloga(e.target.value)}>
                            <option value="KORISNIK">Korisnik</option>
                            <option value="ADMIN">Administrator</option>
                        </select>

                        <button type="submit" disabled={loading}>
                            {loading ? "Kreiranje naloga..." : "Kreiraj Nalog"}
                        </button>
                    </form>

                    <p className="auth-switch">
                        Već imate račun? <Link to="/login">Prijavite se</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;