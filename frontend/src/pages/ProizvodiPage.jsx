import ProizvodiLista from "../components/ProizvodiLista";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../style/proizvodiPage.css";

const ProizvodiPage = () => {
    const { korisnik, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="proizvodi-page">
            <h1>Dobrodošla, {korisnik?.ime} 👋</h1>
            <button onClick={handleLogout} className="logout-btn" style={{ marginBottom: "20px" }}>
                Logout
            </button>

            <ProizvodiLista />
        </div>
    );
};

export default ProizvodiPage;
