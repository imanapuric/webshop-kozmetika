import { useEffect, useState } from 'react';
import api from '../services/api';

const DodajProizvod = () => {
    const [kategorije, setKategorije] = useState([]);
    const [form, setForm] = useState({
        naziv: '',
        opis: '',
        cijena: '',
        kolicina: '',
        kategorija_id: ''
    });

    useEffect(() => {
        api.get('/kategorije')
            .then(res => setKategorije(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        api.post('/proizvodi', form)
            .then(() => {
                alert('Proizvod uspješno dodan');
                setForm({
                    naziv: '',
                    opis: '',
                    cijena: '',
                    kolicina: '',
                    kategorija_id: ''
                });
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h2>Dodaj proizvod</h2>

            <form onSubmit={handleSubmit}>
                <input name="naziv" placeholder="Naziv" onChange={handleChange} /><br />
                <input name="opis" placeholder="Opis" onChange={handleChange} /><br />
                <input name="cijena" type="number" step="0.01" placeholder="Cijena" onChange={handleChange} /><br />
                <input name="kolicina" type="number" placeholder="Količina" onChange={handleChange} /><br />

                <select name="kategorija_id" onChange={handleChange}>
                    <option value="">Odaberi kategoriju</option>
                    {kategorije.map(k => (
                        <option key={k.id} value={k.id}>{k.naziv}</option>
                    ))}
                </select><br /><br />

                <button type="submit">Sačuvaj</button>
            </form>
        </div>
    );
};

export default DodajProizvod;
