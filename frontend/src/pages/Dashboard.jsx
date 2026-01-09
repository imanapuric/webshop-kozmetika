import ProizvodiLista from "../components/ProizvodiLista";
import { useNavigate } from "react-router-dom";
import "../style/dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();
    const korisnik = JSON.parse(localStorage.getItem("korisnik"));

    const handleLogout = () => {
        localStorage.removeItem("korisnik");
        navigate("/");
    };

    return (
        <div className="admin-shell">
            {/* TOP HEADER */}
            <header className="admin-header">
                <div className="header-left">
                    <h1 className="header-logo">Roséa</h1>
                    <p className="header-tagline">Admin kontrola proizvoda</p>
                </div>

                <div className="header-right">
                    <div className="header-user">
                        <p className="user-name">{korisnik?.ime}</p>
                        <p className="user-role">Administrator</p>
                    </div>


                </div>
            </header>

            {/* HERO */}
            <section className="admin-hero">
                <h2>
                    Dobrodošla nazad, <span>{korisnik?.ime}</span>
                </h2>
                <p>
                    Ovdje možeš dodavati, uređivati i brisati proizvode iz ponude.
                </p>
            </section>

            {/* MAIN CONTENT */}
            <main className="admin-content">
                <ProizvodiLista />
            </main>
        </div>
    );
};

export default Dashboard;
