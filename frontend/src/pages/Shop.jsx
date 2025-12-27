import { useEffect, useState } from "react";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "../style/shop.css";

const Shop = () => {
    const [proizvodi, setProizvodi] = useState([]);
    const { dodajUKorpu } = useCart();

    useEffect(() => {
        api.get("/proizvodi")
            .then((res) => setProizvodi(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="shop">
            <h1>Shop - Kozmetika</h1>

            <div className="actions">
                <Link to="/korpa">
                    <button className="btn-secondary">🛒 Idi u korpu</button>
                </Link>
            </div>

            <div className="product-grid">
                {proizvodi.map((p) => (
                    <div key={p.id} className="product-card">
                        <h3>{p.naziv}</h3>
                        <p>{p.opis}</p>
                        <p><b>{p.cijena} KM</b></p>
                        <p>Kategorija: {p.kategorija}</p>

                        <button
                            onClick={() => dodajUKorpu(p)}
                            className="btn-primary"
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
