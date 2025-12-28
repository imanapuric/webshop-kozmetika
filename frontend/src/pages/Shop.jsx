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

            {/* ===== HERO SECTION ===== */}
            <section className="shop-hero">
                <div className="hero-overlay">
                    <h1>Prirodna njega, bez kompromisa</h1>
                    <p>Pažljivo odabrani proizvodi za svakodnevni ritual ljepote.</p>

                    <Link to="/korpa">
                        <button className="hero-btn">
                            Pogledaj korpu
                        </button>
                    </Link>
                </div>
            </section>

            <div className="products-section">
                <h2 className="section-title">Naši proizvodi</h2>

                <div className="product-grid">
                    {proizvodi.map((p) => (
                        <div key={p.id} className="product-card">

                            {/* IMAGE */}
                            <div className="product-image">
                                <img
                                    src="/placeholder-product.jpg"
                                    alt={p.naziv}
                                />
                            </div>

                            {/* CONTENT */}
                            <div className="product-content">
                                <h3>{p.naziv}</h3>
                                <p className="product-desc">{p.opis}</p>

                                <div className="product-footer">
                                    <span className="price">{p.cijena} KM</span>

                                    <button
                                        onClick={() => dodajUKorpu(p)}
                                        className="btn-add"
                                    >
                                        Dodaj u korpu
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Shop;
