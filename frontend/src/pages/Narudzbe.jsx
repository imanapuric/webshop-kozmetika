import { useEffect, useState } from "react";
import api from "../services/api";
import "../style/narudzbe.css";

const Narudzbe = () => {
    const [narudzbe, setNarudzbe] = useState([]);
    const [stavke, setStavke] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [statusMap, setStatusMap] = useState({});

    // ✅ Učitaj sve narudžbe (Admin)
    const fetchNarudzbe = () => {
        api.get("/narudzbe")
            .then(res => {
                setNarudzbe(res.data);

                // popuni mapu statusa
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

    // ✅ Učitaj stavke za izabranu narudžbu
    const ucitajStavke = (id) => {
        setSelectedId(id);

        api.get(`/narudzbe/${id}/stavke`)
            .then(res => setStavke(res.data))
            .catch(err => console.error(err));
    };

    // ✅ Sačuvaj status (PUT)
    const sacuvajStatus = (id) => {
        api.put(`/narudzbe/${id}/status`, { status: statusMap[id] })
            .then(() => {
                alert("Status ažuriran ✅");
                fetchNarudzbe(); // refresh liste
            })
            .catch(err => {
                console.error(err);
                alert("Greška pri ažuriranju statusa!");
            });
    };

    return (
        <div className="narudzbe">
            <h1>Narudžbe (Admin)</h1>

            <table className="table" cellPadding="8" style={{ width: "100%", marginTop: "15px" }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Korisnik</th>
                    <th>Email</th>
                    <th>Ukupno</th>
                    <th>Status + Akcija</th>
                    <th>Datum</th>
                    <th>Detalji</th>
                </tr>
                </thead>

                <tbody>
                {narudzbe.map(n => (
                    <tr key={n.id}>
                        <td>{n.id}</td>
                        <td>{n.korisnik_ime}</td>
                        <td>{n.korisnik_email}</td>
                        <td>{n.ukupno} KM</td>

                        {/* ✅ Status dropdown + save */}
                        <td>
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
                                style={{ marginLeft: "10px" }}
                                onClick={() => sacuvajStatus(n.id)}
                            >
                                Sačuvaj
                            </button>
                        </td>

                        <td>{new Date(n.datum_kreiranja).toLocaleString()}</td>

                        <td>
                            <button onClick={() => ucitajStavke(n.id)}>
                                Prikaži stavke
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* ✅ Detalji narudžbe */}
            {selectedId && (
                <>
                    <h2 style={{ marginTop: "30px" }}>Stavke narudžbe #{selectedId}</h2>

                    <table className="table" cellPadding="8" style={{ width: "100%", marginTop: "10px" }}>
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
                                <td>{s.kolicina}</td>
                                <td>{s.cijena} KM</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default Narudzbe;
