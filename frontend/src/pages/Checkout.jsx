import { useCart } from "../context/CartContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../style/checkout.css";

const Checkout = () => {
    const { korpa, ocistiKorpu } = useCart();
    const navigate = useNavigate();

    const korisnik = JSON.parse(localStorage.getItem("korisnik"));

    // reduce će svesti sve elemente niza u jednu vrijednost (ukupnu cijenu)
    const ukupno = korpa.reduce(
        (sum, p) => sum + Number(p.cijena) * p.kolicinaUKorpi,
        0
    );

    const potvrdiNarudzbu = () => {

        if (!korisnik) {
            alert("Morate biti prijavljeni da biste naručili!");
            navigate("/login");
            return;
        }
        // priprema podataka za slanje na backend
        const payload = {
            korisnik_id: korisnik.id,
            ukupno,
            stavke: korpa.map(p => ({
                proizvod_id: p.id,
                kolicina: p.kolicinaUKorpi,
                cijena: p.cijena
            }))
        };

        api.post("/narudzbe", payload)
            .then(() => {
                alert("Narudžba uspješno poslana");
                ocistiKorpu();
                navigate("/shop");
            })
            .catch(err => {
                alert("Greška: " + (err.response?.data?.poruka || "nije uspjelo"));
            });
    };

    return (
        <div className="checkout">
            <div className="checkout-top">
                <div className="checkout-items-card">
                    <h2>Proizvodi u korpi</h2>

                    {korpa.length === 0 && <p>Korpa je prazna.</p>}

                    {korpa.map((p) => (
                        <div className="checkout-item" key={p.id}>
                            <img
                                src={p.slika ? `http://localhost:3001/uploads/${p.slika}` : require('../picture/pD1.jpg')}
                                alt={p.naziv}
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = require('../picture/pD1.jpg');
                                }}
                            />
                            <div className="meta">
                                <div style={{ fontWeight: 700 }}>{p.naziv}</div>
                                <div style={{ fontSize: 13, color: '#6b4b4a' }}>Cijena: {Number(p.cijena).toFixed(2)} KM</div>
                                <div style={{ fontSize: 13, color: '#6b4b4a' }}>Količina: {p.kolicinaUKorpi}</div>
                            </div>
                            <div class ="cijena "style={{ fontWeight: 700 }}>{(Number(p.cijena) * p.kolicinaUKorpi).toFixed(2)} KM</div>
                        </div>
                    ))}
                </div>

                <div className="checkout-summary-card">
                    <h2>Rezime narudžbe</h2>
                    <div className="summary-row">
                        <span>Ukupno:</span>
                        <strong>{ukupno.toFixed(2)} KM</strong>
                    </div>

                    <button onClick={potvrdiNarudzbu} className="confirm-btn" disabled={korpa.length === 0}>Potvrdi narudžbu</button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
