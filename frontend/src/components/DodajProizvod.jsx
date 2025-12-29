import { useEffect, useState } from "react";
import api from "../services/api";
import "../style/dashboard.css";

const DodajProizvod = ({ selectedProizvod, refresh }) => {
    const [kategorije, setKategorije] = useState([]);

    const [formData, setFormData] = useState({
        naziv: "",
        opis: "",
        cijena: "",
        kolicina: "",
        kategorija_id: "",
        slika: null
    });

    useEffect(() => {
        api.get("/kategorije")
            .then(res => setKategorije(res.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (selectedProizvod) {
            setFormData({
                naziv: selectedProizvod.naziv || "",
                opis: selectedProizvod.opis || "",
                cijena: selectedProizvod.cijena || "",
                kolicina: selectedProizvod.kolicina || "",
                kategorija_id: selectedProizvod.kategorija_id || "",
                slika: null
            });
        }
    }, [selectedProizvod]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, slika: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();
            data.append("naziv", formData.naziv);
            data.append("opis", formData.opis);
            data.append("cijena", formData.cijena);
            data.append("kolicina", formData.kolicina);
            data.append("kategorija_id", formData.kategorija_id);

            if (formData.slika) {
                data.append("slika", formData.slika);
            }

            if (selectedProizvod) {
                await api.put(`/proizvodi/${selectedProizvod.id}`, data, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            } else {
                await api.post("/proizvodi", data, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            }

            refresh();

            setFormData({
                naziv: "",
                opis: "",
                cijena: "",
                kolicina: "",
                kategorija_id: "",
                slika: null
            });

        } catch (err) {
            console.error(err);
            alert("Greška pri dodavanju proizvoda!");
        }
    };

    return (
        <div className="dashboard-card form-card">
            <h2 className="form-title">
                {selectedProizvod ? "Uredi proizvod" : "Dodaj novi proizvod"}
            </h2>

            <form className="proizvod-form" onSubmit={handleSubmit} encType="multipart/form-data">

                <div className="form-group">
                    <label className="form-label">Naziv</label>
                    <input
                        className="form-input"
                        name="naziv"
                        placeholder="Unesite naziv proizvoda"
                        value={formData.naziv}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Cijena (KM)</label>
                    <input
                        className="form-input"
                        type="number"
                        step="0.01"
                        name="cijena"
                        placeholder="0.00"
                        value={formData.cijena}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group full-width">
                    <label className="form-label">Opis</label>
                    <textarea
                        className="form-textarea"
                        name="opis"
                        placeholder="Unesite opis proizvoda"
                        value={formData.opis}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Količina</label>
                    <input
                        className="form-input"
                        type="number"
                        name="kolicina"
                        placeholder="0"
                        value={formData.kolicina}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Kategorija</label>
                    <select
                        className="form-select"
                        name="kategorija_id"
                        value={formData.kategorija_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Izaberi kategoriju</option>
                        {kategorije.map(k => (
                            <option key={k.id} value={k.id}>
                                {k.naziv}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group full-width">
                    <label className="form-label">Slika proizvoda</label>
                    <input
                        className="form-input"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="form-actions full-width">
                    <button type="submit" className="btn-submit">
                        {selectedProizvod ? "Sačuvaj izmjene" : "Dodaj proizvod"}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default DodajProizvod;
