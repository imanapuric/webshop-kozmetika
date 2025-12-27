import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "../style/korpa.css";

const Korpa = () => {
    const { korpa, ukloniIzKorpe, promijeniKolicinu, ocistiKorpu } = useCart();

    const ukupno = korpa.reduce(
        (sum, p) => sum + Number(p.cijena) * p.kolicinaUKorpi,
        0
    );

    return (
        <div className="korpa">
            <h1>Korpa</h1>

            <div className="actions">
                <Link to="/shop">
                    <button className="btn-secondary">⬅ Nazad u shop</button>
                </Link>

                <Link to="/checkout">
                    <button className="checkout-btn">Nastavi na checkout</button>
                </Link>
            </div>

            {korpa.length === 0 ? (
                <p>Korpa je prazna.</p>
            ) : (
                <>
                    {korpa.map((p) => (
                        <div key={p.id} className="cart-item">
                            <h3>{p.naziv}</h3>
                            <p>Cijena: {p.cijena} KM</p>

                            <input
                                type="number"
                                min="1"
                                value={p.kolicinaUKorpi}
                                onChange={(e) => promijeniKolicinu(p.id, e.target.value)}
                            />

                            <button
                                onClick={() => ukloniIzKorpe(p.id)}
                                className="btn btn-delete"
                            >
                                Ukloni
                            </button>
                        </div>
                    ))}

                    <h2>Ukupno: {ukupno.toFixed(2)} KM</h2>

                    <button
                        onClick={ocistiKorpu}
                        className="btn-secondary"
                    >
                        Očisti korpu
                    </button>
                </>
            )}
        </div>
    );
};

export default Korpa;
