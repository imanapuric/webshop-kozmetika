import { useEffect, useState } from "react";
import api from "../services/api";

const DodajProizvod = ({ selectedProizvod, refresh }) => {

    const [kategorije, setKategorije] = useState([]);

    const [formData, setFormData] = useState({
        naziv: "",
        opis: "",
        cijena: "",
        kolicina: "",
        kategorija_id: ""
    });

    // ✅ Učitavanje kategorija iz baze
    useEffect(() => {
        api.get("/kategorije")
            .then(res => setKategorije(res.data))
            .catch(err => console.error("Greška kod učitavanja kategorija:", err));
    }, []);

    // ✅ Ako je kliknut "Izmijeni", popuni formu
    useEffect(() => {
        if (selectedProizvod) {
            setFormData({
                naziv: selectedProizvod.naziv || "",
                opis: selectedProizvod.opis || "",
                cijena: selectedProizvod.cijena || "",
                kolicina: selectedProizvod.kolicina || "",
                kategorija_id: selectedProizvod.kategorija_id || ""
            });
        }
    }, [selectedProizvod]);

    // ✅ Promjena inputa
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedProizvod) {
            api.put(`/proizvodi/${selectedProizvod.id}`, formData)
                .then(() => {
                    alert("Proizvod ažuriran ✅");
                    refresh();
                })
                .catch(err => console.error("Greška kod ažuriranja:", err));
        } else {
            api.post("/proizvodi", formData)
                .then(() => {
                    alert("Proizvod dodan ✅");
                    refresh();
                })
                .catch(err => console.error("Greška kod dodavanja:", err));
        }

        // ✅ Reset forme
        setFormData({
            naziv: "",
            opis: "",
            cijena: "",
            kolicina: "",
            kategorija_id: ""
        });
    };

    return (
        <div>
            <h2>{selectedProizvod ? "Uredi proizvod" : "Dodaj proizvod"}</h2>

            <form onSubmit={handleSubmit}>
                <input
                    name="naziv"
                    placeholder="Naziv"
                    value={formData.naziv}
                    onChange={handleChange}
                    required
                />
                <br />

                <input
                    name="opis"
                    placeholder="Opis"
                    value={formData.opis}
                    onChange={handleChange}
                />
                <br />

                <input
                    name="cijena"
                    placeholder="Cijena"
                    type="number"
                    value={formData.cijena}
                    onChange={handleChange}
                    required
                />
                <br />

                <input
                    name="kolicina"
                    placeholder="Količina"
                    type="number"
                    value={formData.kolicina}
                    onChange={handleChange}
                    required
                />
                <br />

                {/* ✅ Dropdown sa nazivima kategorija */}
                <select
                    name="kategorija_id"
                    value={formData.kategorija_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">-- Izaberi kategoriju --</option>

                    {kategorije.map(k => (
                        <option key={k.id} value={k.id}>
                            {k.naziv}
                        </option>
                    ))}
                </select>

                <br />

                <button type="submit">
                    {selectedProizvod ? "Sačuvaj izmjene" : "Dodaj"}
                </button>
            </form>
        </div>
    );
};

export default DodajProizvod;
