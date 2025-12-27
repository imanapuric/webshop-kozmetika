import { useEffect, useState } from 'react';
import api from '../services/api';
import DodajProizvod from './DodajProizvod';

const ProizvodiLista = () => {
    const [proizvodi, setProizvodi] = useState([]);
    const [selectedProizvod, setSelectedProizvod] = useState(null);

    const fetchProizvodi = () => {
        api.get('/proizvodi')
            .then(res => setProizvodi(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchProizvodi();
    }, []);

    const obrisiProizvod = (id) => {
        const potvrda = window.confirm("Da li ste sigurni da želite obrisati ovaj proizvod?");
        if (!potvrda) return;

        api.delete(`/proizvodi/${id}`)
            .then(() => {
                alert("Proizvod obrisan!");
                fetchProizvodi();
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            {/* Forma za dodavanje/uređivanje */}
            <DodajProizvod selectedProizvod={selectedProizvod} refresh={fetchProizvodi} />

            <hr />

            <h2>Lista proizvoda</h2>

            <table border="1" cellPadding="8">
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
                        <td>{p.cijena}</td>
                        <td>{p.kolicina}</td>
                        <td>
                            <button
                                style={{ background: "orange", color: "white", border: "none", padding: "6px 10px", marginRight: "5px", cursor: "pointer" }}
                                onClick={() => setSelectedProizvod(p)}
                            >
                                Izmijeni
                            </button>

                            <button
                                style={{ background: "red", color: "white", border: "none", padding: "6px 10px", cursor: "pointer" }}
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
    );
};

export default ProizvodiLista;
