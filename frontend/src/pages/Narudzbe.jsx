import { useEffect, useState } from "react";
import api from "../services/api";
import "../style/narudzbe.css";

const Narudzbe = () => {
    const [narudzbe, setNarudzbe] = useState([]);
    const [stavke, setStavke] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [statusMap, setStatusMap] = useState({});

    useEffect(() => {
        fetchNarudzbe();
    }, []);

    const fetchNarudzbe = () => {
        api.get("/narudzbe")
            .then(res => {
                setNarudzbe(res.data);
                const mapa = {};
                res.data.forEach(n => (mapa[n.id] = n.status));
                setStatusMap(mapa);
            })
            .catch(err => console.error(err));
    };

    const ucitajStavke = (id) => {
        setSelectedId(id);
        api.get(`/narudzbe/${id}/stavke`)
            .then(res => setStavke(res.data))
            .catch(err => console.error(err));
    };

    const sacuvajStatus = (id) => {
        api.put(`/narudzbe/${id}/status`, { status: statusMap[id] })
            .then(() => fetchNarudzbe())
            .catch(() => alert("Greška pri ažuriranju statusa"));
    };

    return (
        <div className="narudzbe-shell">

            <div className="narudzbe-header">
                <h1>Narudžbe</h1>
                <p>Pregled svih narudžbi i upravljanje statusima.</p>
            </div>

            {/* SVE NARUDŽBE */}
            <section className="narudzbe-card">
                <h2 className="section-title">Sve narudžbe</h2>

                <table className="narudzbe-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Korisnik</th>
                        <th>Email</th>
                        <th className="center">Ukupno</th>
                        <th className="center">Status</th>
                        <th className="center">Datum</th>
                        <th className="center">Detalji</th>
                    </tr>
                    </thead>

                    <tbody>
                    {narudzbe.map(n => (
                        <tr key={n.id}>
                            <td className="id-col">{n.id}</td>
                            <td>{n.korisnik_ime}</td>
                            <td className="email-col">{n.korisnik_email}</td>
                            <td className="price-col center">{Number(n.ukupno).toFixed(2)} KM</td>

                            <td className="center">
                                <div className="status-wrapper">
                                    <select
                                        value={statusMap[n.id] || n.status}
                                        onChange={(e) =>
                                            setStatusMap({ ...statusMap, [n.id]: e.target.value })
                                        }
                                    >
                                        <option value="u obradi">U obradi</option>
                                        <option value="poslano">Poslano</option>
                                        <option value="završeno">Završeno</option>
                                        <option value="otkazano">Otkazano</option>
                                    </select>

                                    <button onClick={() => sacuvajStatus(n.id)}>
                                        Sačuvaj
                                    </button>
                                </div>
                            </td>

                            <td className="center">
                                {new Date(n.datum_kreiranja).toLocaleString()}
                            </td>

                            <td className="center">
                                <button
                                    className="btn-details"
                                    onClick={() => ucitajStavke(n.id)}
                                >
                                    Prikaži stavke
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>

            {/* STAVKE NARUDŽBE */}
            {selectedId && (
                <section className="narudzbe-card">
                    <h2 className="section-title">
                        Stavke narudžbe <span>{selectedId}</span>
                    </h2>

                    <table className="narudzbe-table stavke-table">
                        <thead>
                        <tr>
                            <th className="left">Proizvod</th>
                            <th className="center">Količina</th>
                            <th className="center">Cijena</th>
                        </tr>
                        </thead>

                        <tbody>
                        {stavke.map(s => (
                            <tr key={s.id}>
                                <td className="left">{s.naziv}</td>
                                <td className="center">{s.kolicina}</td>
                                <td className="center price-col">
                                    {Number(s.cijena).toFixed(2)} KM
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
            )}
        </div>
    );
};

export default Narudzbe;
