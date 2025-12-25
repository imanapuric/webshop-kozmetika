import ProizvodiLista from "../components/ProizvodiLista";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const korisnik = JSON.parse(localStorage.getItem("korisnik"));

    const handleLogout = () => {
        localStorage.removeItem("korisnik");
        window.location.href = "/login";
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Dobrodošla, {korisnik?.ime} 👋</h2>

            <div style={{ marginBottom: "20px" }}>
                <button onClick={handleLogout}>Logout</button>

                <Link to="/narudzbe">
                    <button style={{ marginLeft: "10px" }}>Narudžbe</button>
                </Link>

                <Link to="/shop">
                    <button style={{ marginLeft: "10px" }}>Shop</button>
                </Link>
            </div>

            <ProizvodiLista />
        </div>
    );
};

export default Dashboard;
