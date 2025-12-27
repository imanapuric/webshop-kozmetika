import { useEffect, useState } from "react";
import api from "../services/api";
import DodajProizvod from "./DodajProizvod";
import "../style/dashboard.css";

const ProizvodiLista = () => {
    const [proizvodi, setProizvodi] = useState([]);
    const [selectedProizvod, setSelectedProizvod] = useState(null);

    const fetchProizvodi = () => {
        api.get("/proizvodi")
            .then(res => setProizvodi(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchProizvodi();
    }, []);

    const obrisiProizvod = (id) => {
        if (!window.confirm("Da li ste sigurni da želite obrisati proizvod?")) return;

        api.delete(`/proizvodi/${id}`)
            .then(() => fetchProizvodi())
            .catch(err => console.error(err));
    };

    return (
        <div className="dashboard-content">

            {/* ===== DODAJ PROIZVOD ===== */}
            <section>
                <DodajProizvod
                    selectedProizvod={selectedProizvod}
                    refresh={fetchProizvodi}
                />
            </section>


            {/* ===== LISTA PROIZVODA ===== */}
            <section className="dashboard-card">
                <h3 className="section-title">Proizvodi u ponudi</h3>

                <div className="table-wrapper">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Naziv</th>
                            <th>Kategorija</th>
                            <th>Cijena (KM)</th>
                            <th>Količina</th>
                            <th>Akcije</th>
                        </tr>
                        </thead>

                        <tbody>
                        {proizvodi.map(p => (
                            <tr key={p.id}>
                                <td>{p.naziv}</td>
                                <td>{p.kategorija}</td>
                                <td>{Number(p.cijena).toFixed(2)}</td>
                                <td>{p.kolicina}</td>
                                <td>
                                    <button
                                        className="btn btn-edit"
                                        onClick={() => setSelectedProizvod(p)}
                                    >
                                        Izmijeni
                                    </button>
                                    <button
                                        className="btn btn-delete"
                                        onClick={() => obrisiProizvod(p.id)}
                                    >
                                        Obriši
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </section>

        </div>
    );
};

export default ProizvodiLista;
