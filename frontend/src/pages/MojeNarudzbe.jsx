import { useEffect, useState } from "react";
import api from "../services/api";

const MojeNarudzbe = () => {
    const korisnik = JSON.parse(localStorage.getItem("korisnik"));

    const [narudzbe, setNarudzbe] = useState([]);
    const [stavke, setStavke] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        if (!korisnik) return;

        api.get(`/narudzbe/moje/${korisnik.id}`)
            .then(res => setNarudzbe(res.data))
            .catch(err => console.error(err));
    }, [korisnik]);

    const ucitajStavke = (id) => {
        setSelectedId(id);

        api.get(`/narudzbe/${id}/stavke`)
            .then(res => setStavke(res.data))
            .catch(err => console.error(err));
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>🧾 Moje narudžbe</h1>

            {narudzbe.length === 0 ? (
                <p>Nema narudžbi.</p>
            ) : (
                <table border="1" cellPadding="8" style={{ width: "100%", marginTop: "15px" }}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ukupno</th>
                        <th>Status</th>
                        <th>Datum</th>
                        <th>Detalji</th>
                    </tr>
                    </thead>
                    <tbody>
                    {narudzbe.map(n => (
                        <tr key={n.id}>
                            <td>{n.id}</td>
                            <td>{n.ukupno} KM</td>
                            <td>{n.status}</td>
                            <td>{new Date(n.datum_kreiranja).toLocaleString()}</td>
                            <td>
                                <button onClick={() => ucitajStavke(n.id)}>Prikaži stavke</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {selectedId && (
                <>
                    <h2 style={{ marginTop: "30px" }}>Stavke narudžbe #{selectedId}</h2>

                    <table border="1" cellPadding="8" style={{ width: "100%", marginTop: "10px" }}>
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

export default MojeNarudzbe;
