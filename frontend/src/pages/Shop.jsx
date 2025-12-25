import { useEffect, useState } from "react";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Shop = () => {
    const [proizvodi, setProizvodi] = useState([]);
    const { dodajUKorpu } = useCart();

    useEffect(() => {
        api.get("/proizvodi")
            .then((res) => setProizvodi(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Shop - Kozmetika</h1>

            <Link to="/korpa">
                <button style={{ marginBottom: "20px" }}>🛒 Idi u korpu</button>
            </Link>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
                {proizvodi.map((p) => (
                    <div
                        key={p.id}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "10px",
                            padding: "15px",
                            boxShadow: "2px 2px 10px rgba(0,0,0,0.1)"
                        }}
                    >
                        <h3>{p.naziv}</h3>
                        <p>{p.opis}</p>
                        <p><b>{p.cijena} KM</b></p>
                        <p>Kategorija: {p.kategorija}</p>

                        <button
                            onClick={() => dodajUKorpu(p)}
                            style={{ background: "green", color: "white", border: "none", padding: "8px 12px" }}
                        >
                            Dodaj u korpu
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shop;
