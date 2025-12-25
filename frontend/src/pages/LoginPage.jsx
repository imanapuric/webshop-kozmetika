import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
                navigate("/proizvodi");
            })
            .catch((err) => {
                setError(err.response?.data?.poruka || "Greška pri loginu!");
            });
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Prijava</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /><br />

                <input
                    type="password"
                    placeholder="Lozinka"
                    value={lozinka}
                    onChange={(e) => setLozinka(e.target.value)}
                    required
                /><br />

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
