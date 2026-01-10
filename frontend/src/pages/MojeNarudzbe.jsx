import { useEffect, useState } from "react";
import api from "../services/api";
import "../style/mojeNarudzbe.css";

const MojeNarudzbe = () => {
    const korisnik = JSON.parse(localStorage.getItem("korisnik"));

    const [narudzbe, setNarudzbe] = useState([]);
    const [stavke, setStavke] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        if (!korisnik) return;

        api
            .get(`/narudzbe/moje/${korisnik.id}`)
            .then((res) => setNarudzbe(res.data))
            .catch((err) => console.error(err));
    }, [korisnik]);

    const ucitajStavke = (id) => {
        if (selectedId === id) {
            setSelectedId(null);
            setStavke([]);
            return;
        }

        setSelectedId(id);

        api
            .get(`/narudzbe/${id}/stavke`)
            .then((res) => setStavke(res.data))
            .catch((err) => console.error(err));
    };

    return (
        <div className="moje-narudzbe">
            <h1>Moje narudžbe</h1>
            <p className="subtitle">Pregled vaših prethodnih kupovina</p>

            <div className="narudzbe-card">
                <table className="narudzbe-table">
                    <thead>
                    <tr>
                        <th className="col-id">ID</th>
                        <th className="col-ukupno">Ukupno</th>
                        <th className="col-status">Status</th>
                        <th className="col-datum">Datum</th>
                        <th className="col-akcije"></th>
                    </tr>
                    </thead>

                    <tbody>
                    {narudzbe.map((n) => (
                        <tr key={n.id}>
                            <td className="col-id">{n.id}</td>
                            <td className="col-ukupno">{n.ukupno} KM</td>
                            <td className="col-status">
                                <span className="status-badge">{n.status}</span>
                            </td>
                            <td className="col-datum">
                                {new Date(n.datum_kreiranja).toLocaleString()}
                            </td>
                            <td className="col-akcije actions">
                                <button className="btn-stavke" onClick={() => ucitajStavke(n.id)}>
                                    {selectedId === n.id ? "Sakrij stavke" : "Prikaži stavke"}
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {selectedId && (
                <div className="stavke-card">
                    <h2>Stavke narudžbe {selectedId}</h2>

                    <table className="stavke-table">
                        <thead>
                        <tr>
                            <th className="col-proizvod">Proizvod</th>
                            <th className="col-kolicina th-center">Količina</th>
                            <th className="col-cijena th-right">Cijena</th>
                        </tr>
                        </thead>

                        <tbody>
                        {stavke.map((s) => (
                            <tr key={s.id}>
                                <td className="col-proizvod">{s.naziv}</td>
                                <td className="col-kolicina td-center">{s.kolicina}</td>
                                <td className="col-cijena td-right">{s.cijena} KM</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MojeNarudzbe;
