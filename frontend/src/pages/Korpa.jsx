import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Korpa = () => {
    const { korpa, ukloniIzKorpe, promijeniKolicinu, ocistiKorpu } = useCart();

    const ukupno = korpa.reduce(
        (sum, p) => sum + Number(p.cijena) * p.kolicinaUKorpi,
        0
    );

    return (
        <div style={{ padding: "20px" }}>
            <h1>🛒 Korpa</h1>

            <Link to="/shop">
                <button style={{ marginBottom: "20px" }}>⬅ Nazad u shop</button>
            </Link>

            <Link to="/checkout">
                <button style={{ background: "green", color: "white", padding: "10px", marginTop: "10px" }}>
                    Nastavi na checkout
                </button>
            </Link>

            {korpa.length === 0 ? (
                <p>Korpa je prazna.</p>
            ) : (
                <>
                    {korpa.map((p) => (
                        <div
                            key={p.id}
                            style={{
                                border: "1px solid #ccc",
                                padding: "10px",
                                marginBottom: "10px",
                                borderRadius: "10px"
                            }}
                        >
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
                                style={{ marginLeft: "10px", background: "red", color: "white" }}
                            >
                                Ukloni
                            </button>
                        </div>
                    ))}

                    <h2>Ukupno: {ukupno.toFixed(2)} KM</h2>

                    <button
                        onClick={ocistiKorpu}
                        style={{ background: "black", color: "white", padding: "10px" }}
                    >
                        Očisti korpu
                    </button>
                </>
            )}
        </div>
    );
};

export default Korpa;
