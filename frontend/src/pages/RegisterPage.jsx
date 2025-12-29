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
            .then((res) => {
                // on success, go to login
                navigate("/login");
            })
            .catch((err) => {
                setError(err.response?.data?.poruka || "Greška pri registraciji");
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="login-wrapper">
            <div className="login-box">

                {/* LEFT IMAGE */}
                <div className="login-image">
                    <img src={require("../picture/flower.jpg")} alt="Register visual" />
                </div>

                {/* RIGHT FORM */}
                <div className="login-form">
                    <h2>Registracija</h2>

                    {error && <p className="error">{error}</p>}

                    <form onSubmit={handleSubmit}>
                        <label>Ime</label>
                        <input
                            type="text"
                            placeholder="Unesite ime"
                            value={ime}
                            onChange={(e) => setIme(e.target.value)}
                            required
                        />

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

                        <label>Potvrdite lozinku</label>
                        <input
                            type="password"
                            placeholder="Ponovno unesite lozinku"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            required
                        />
                        <label>Uloga</label>
                            <select value={uloga} onChange={(e) => setUloga(e.target.value)}>
                                <option value="KORISNIK">Korisnik</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                            <button type="submit"
                                    disabled={loading}>{loading ? "Registracija..." : "Registruj se"}</button>
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

