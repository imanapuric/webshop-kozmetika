import { useCart } from "../context/CartContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const { korpa, ocistiKorpu } = useCart();
    const navigate = useNavigate();

    const korisnik = JSON.parse(localStorage.getItem("korisnik"));

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
                alert("Narudžba uspješno poslana ✅");
                ocistiKorpu();
                navigate("/shop");
            })
            .catch(err => {
                alert("Greška: " + (err.response?.data?.poruka || "nije uspjelo"));
            });
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Checkout</h1>
            <h2>Ukupno: {ukupno.toFixed(2)} KM</h2>

            <button
                onClick={potvrdiNarudzbu}
                style={{ background: "green", color: "white", padding: "10px" }}
            >
                Potvrdi narudžbu
            </button>
        </div>
    );
};

export default Checkout;
