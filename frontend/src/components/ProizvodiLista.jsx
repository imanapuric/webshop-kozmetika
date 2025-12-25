import { useEffect, useState } from 'react';
import api from '../services/api';

const ProizvodiLista = () => {
    const [proizvodi, setProizvodi] = useState([]);

    useEffect(() => {
        api.get('/proizvodi')
            .then(res => setProizvodi(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>Lista proizvoda</h2>

            <table border="1" cellPadding="8">
                <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Kategorija</th>
                    <th>Cijena (KM)</th>
                    <th>Količina</th>
                </tr>
                </thead>
                <tbody>
                {proizvodi.map(p => (
                    <tr key={p.id}>
                        <td>{p.naziv}</td>
                        <td>{p.kategorija}</td>
                        <td>{p.cijena}</td>
                        <td>{p.kolicina}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProizvodiLista;
