import ProizvodiLista from "../components/ProizvodiLista";
import "../style/dashboard.css";

const Dashboard = () => {
    const korisnik = JSON.parse(localStorage.getItem("korisnik"));

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1 className="dashboard-brand">Roséa</h1>
                <p className="dashboard-tagline">
                    Tamo gdje njega postaje ritual
                </p>
                <h2 className="dashboard-title">
                    Dobrodošla, {korisnik?.ime}
                </h2>
            </div>

            <ProizvodiLista />
        </div>
    );
};

export default Dashboard;
