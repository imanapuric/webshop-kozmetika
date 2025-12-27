import ProizvodiLista from "../components/ProizvodiLista";
import "../style/dashboard.css";

const Dashboard = () => {
    const korisnik = JSON.parse(localStorage.getItem("korisnik"));

    return (
        <div className="dashboard">
            <h2 className="dashboard-title">Dobrodošla, {korisnik?.ime} 👋</h2>

            <div className="dashboard-controls" style={{ marginBottom: "20px" }}>
            </div>

            <ProizvodiLista />
        </div>
    );
};

export default Dashboard;
