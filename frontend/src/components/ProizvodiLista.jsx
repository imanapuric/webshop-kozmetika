import { useEffect, useState } from "react";
import api from "../services/api";
import DodajProizvod from "./DodajProizvod";
import "../style/dashboard.css";

const ProizvodiLista = () => {
    const [proizvodi, setProizvodi] = useState([]);
    const [selectedProizvod, setSelectedProizvod] = useState(null);

    const fetchProizvodi = () => {
        api
            .get("/proizvodi")
            .then((res) => setProizvodi(res.data))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchProizvodi();
    }, []);

    const obrisiProizvod = (id) => {
        if (!window.confirm("Da li ste sigurni da želite obrisati proizvod?")) return;

        api
            .delete(`/proizvodi/${id}`)
            .then(() => {
                // ako si obrisala proizvod koji je bio selektovan za edit, resetuj
                if (selectedProizvod?.id === id) setSelectedProizvod(null);
                fetchProizvodi();
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="dashboard-content">
            {/* ===== DODAJ / UREDI PROIZVOD ===== */}
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
                            <th>Slika</th>
                            <th>Naziv</th>
                            <th>Kategorija</th>
                            <th>Cijena (KM)</th>
                            <th>Količina</th>
                            <th>Akcije</th>
                        </tr>
                        </thead>

                        <tbody>
                        {proizvodi.map((p) => (
                            <tr key={p.id}>
                                <td>
                                    {p.slika ? (
                                        <img
                                            src={`http://localhost:3001/uploads/${p.slika}`}
                                            alt={p.naziv}
                                            style={{
                                                width: 55,
                                                height: 55,
                                                objectFit: "cover",
                                                borderRadius: 8,
                                                border: "1px solid rgba(0,0,0,0.08)",
                                            }}
                                            onError={(e) => {
                                                // ako slika ne postoji na serveru, sakrij je (bez placeholdera)
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.style.display = "none";
                                            }}
                                        />
                                    ) : null}
                                </td>

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

                        {proizvodi.length === 0 && (
                            <tr>
                                <td
                                    colSpan="6"
                                    style={{ textAlign: "center", padding: 18, color: "#888" }}
                                >
                                    Nema proizvoda za prikaz.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default ProizvodiLista;
