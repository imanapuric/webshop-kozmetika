import { useEffect, useState } from 'react';
import api from '../services/api';
import DodajProizvod from './DodajProizvod';
import '../style/dashboard.css';

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
        <div className="proizvodi-lista">
            {/* Forma za dodavanje/uređivanje */}
            <DodajProizvod selectedProizvod={selectedProizvod} refresh={fetchProizvodi} />

            <hr />

            <h2>Lista proizvoda</h2>

            <table className="table" border="1" cellPadding="8">
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
    );
};

export default ProizvodiLista;
