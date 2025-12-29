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

    const getImageSrc = (p) => {
        if (p.slika) return `http://localhost:3001/uploads/${p.slika}`;
        return "https://via.placeholder.com/300x300?text=No+Image";
    };

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
                                {p.slika && (
                                    <img
                                        src={`http://localhost:3001/uploads/${p.slika}`}
                                        alt={p.naziv}
                                    />
                                )}
                            </div>


                            {/* CONTENT */}
                            <div className="product-content">
                                <h3>{p.naziv}</h3>
                                <p className="product-desc">{p.opis}</p>

                                <div className="product-footer">
                                    <span className="price">{Number(p.cijena).toFixed(2)} KM</span>

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
