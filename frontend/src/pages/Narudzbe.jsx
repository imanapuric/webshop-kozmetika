import { useEffect, useState } from "react";
import api from "../services/api";
import "../style/narudzbe.css";

const Narudzbe = () => {
    const [narudzbe, setNarudzbe] = useState([]);
    const [stavke, setStavke] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [statusMap, setStatusMap] = useState({});

    const fetchNarudzbe = () => {
        api.get("/narudzbe")
            .then(res => {
                setNarudzbe(res.data);

                const mapa = {};
                res.data.forEach(n => {
                    mapa[n.id] = n.status;
                });
                setStatusMap(mapa);
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchNarudzbe();
    }, []);

    const ucitajStavke = (id) => {
        setSelectedId(id);

        api.get(`/narudzbe/${id}/stavke`)
            .then(res => setStavke(res.data))
            .catch(err => console.error(err));
    };

    const sacuvajStatus = (id) => {
        api.put(`/narudzbe/${id}/status`, { status: statusMap[id] })
            .then(() => {
                alert("Status uspješno ažuriran.");
                fetchNarudzbe();
            })
            .catch(err => {
                console.error(err);
                alert("Greška pri ažuriranju statusa!");
            });
    };

    return (
        <div className="narudzbe-shell">

            <div className="narudzbe-header">
                <h1>Narudžbe</h1>
                <p>Pregled svih narudžbi i upravljanje statusima.</p>
            </div>

            <section className="narudzbe-card">
                <h2 className="section-title">Sve narudžbe</h2>

                <div className="table-wrapper">
                    <table className="narudzbe-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Korisnik</th>
                            <th>Email</th>
                            <th>Ukupno</th>
                            <th>Status</th>
                            <th>Datum</th>
                            <th>Detalji</th>
                        </tr>
                        </thead>

                        <tbody>
                        {narudzbe.map(n => (
                            <tr key={n.id} className={selectedId === n.id ? "active-row" : ""}>

                                <td className="id-col">#{n.id}</td>
                                <td>{n.korisnik_ime}</td>
                                <td className="email-col">{n.korisnik_email}</td>
                                <td className="price-col">{Number(n.ukupno).toFixed(2)} KM</td>

                                <td>
                                    <div className="status-box">
                                        <select
                                            value={statusMap[n.id] || n.status}
                                            onChange={(e) =>
                                                setStatusMap({ ...statusMap, [n.id]: e.target.value })
                                            }
                                        >
                                            <option value="u obradi">u obradi</option>
                                            <option value="poslano">poslano</option>
                                            <option value="završeno">završeno</option>
                                            <option value="otkazano">otkazano</option>
                                        </select>

                                        <button
                                            className="btn-save"
                                            onClick={() => sacuvajStatus(n.id)}
                                        >
                                            Sačuvaj
                                        </button>
                                    </div>
                                </td>

                                <td>{new Date(n.datum_kreiranja).toLocaleString()}</td>

                                <td>
                                    <button
                                        className="btn-details"
                                        onClick={() => ucitajStavke(n.id)}
                                    >
                                        Prikaži stavke
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {narudzbe.length === 0 && (
                            <tr>
                                <td colSpan="7" className="empty-row">
                                    Nema narudžbi za prikaz.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </section>

            {selectedId && (
                <section className="narudzbe-card details-card">
                    <h2 className="section-title">
                        Stavke narudžbe <span>#{selectedId}</span>
                    </h2>

                    <div className="table-wrapper">
                        <table className="narudzbe-table">
                            <thead>
                            <tr>
                                <th>Proizvod</th>
                                <th>Količina</th>
                                <th>Cijena</th>
                            </tr>
                            </thead>

                            <tbody>
                            {stavke.map(s => (
                                <tr key={s.id}>
                                    <td>{s.naziv}</td>
                                    <td className="qty-col">{s.kolicina}</td>
                                    <td className="price-col">{Number(s.cijena).toFixed(2)} KM</td>
                                </tr>
                            ))}

                            {stavke.length === 0 && (
                                <tr>
                                    <td colSpan="3" className="empty-row">
                                        Nema stavki za ovu narudžbu.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Narudzbe;
