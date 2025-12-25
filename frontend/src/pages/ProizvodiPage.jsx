import ProizvodiLista from "../components/ProizvodiLista";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProizvodiPage = () => {
    const { korisnik, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Dobrodošla, {korisnik?.ime} 👋</h1>
            <button onClick={handleLogout} style={{ marginBottom: "20px" }}>
                Logout
            </button>

            <ProizvodiLista />
        </div>
    );
};

export default ProizvodiPage;
