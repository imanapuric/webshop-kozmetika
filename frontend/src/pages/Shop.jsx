import { useEffect, useState } from "react";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "../style/shop.css";
import logo from "../picture/logo.png";
import oNamaImg from "../picture/oNama.jpg";

import {
    FiInstagram,
    FiFacebook,
    FiTwitter
} from "react-icons/fi";

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

            {/* HERO */}
            <section className="shop-hero">
                <div className="hero-overlay">
                    <h1>Prirodna njega, bez kompromisa</h1>
                    <p>Pažljivo odabrani proizvodi za svakodnevni ritual ljepote.</p>

                    <Link to="/korpa">
                        <button className="hero-btn">Pogledaj korpu</button>
                    </Link>
                </div>
            </section>

            {/* PRODUCTS */}
            <section className="products-section">
                <h2 className="section-title">Naši proizvodi</h2>

                <div className="product-grid">
                    {proizvodi.map((p) => (
                        <div key={p.id} className="product-card">
                            <div className="product-image">
                                {p.slika && (
                                    <img
                                        src={`http://localhost:3001/uploads/${p.slika}`}
                                        alt={p.naziv}
                                    />
                                )}
                            </div>

                            <div className="product-content">
                                <h3>{p.naziv}</h3>
                                <p className="product-desc">{p.opis}</p>

                                <div className="product-footer">
                                    <span className="price">
                                        {Number(p.cijena).toFixed(2)} KM
                                    </span>

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
            </section>

            {/* O NAMA */}
            <section className="about-section">
                <div className="about-inner">

                    {/* LEFT TEXT */}
                    <div className="about-text">
                        <h2>O nama</h2>

                        <p>
                            Roséa je nastala kao zajednička ideja tri studentice
                            softverskog inženjerstva koje su željele spojiti
                            tehnologiju, dizajn i ljubav prema prirodnoj njezi.
                        </p>

                        <p>
                            Ovaj web shop je rezultat našeg timskog rada,
                            pažljivog dizajna i ideje da njega kože treba biti
                            jednostavna, nježna i svjesna.
                        </p>

                        <span className="about-names">
                            Imana Purić · Esada Durmić · Adna Kargić
                        </span>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="about-image">
                        <img src={oNamaImg} alt="O nama" />
                    </div>

                </div>
            </section>

            {/* FOOTER */}
            <footer className="shop-footer">
                <div className="footer-inner">

                    <div className="footer-left">
                        <img src={logo} alt="Roséa logo" className="footer-logo" />
                        <p>
                            Roséa je web shop prirodne kozmetike i rituala njege.
                        </p>
                    </div>

                    <div className="footer-center">
                        <h4>Pratite nas</h4>

                        <div className="footer-socials">
                            <a href="#"><FiInstagram /> Instagram</a>
                            <a href="#"><FiFacebook /> Facebook</a>
                            <a href="#"><FiTwitter /> TikTok</a>
                        </div>
                    </div>

                    <div className="footer-right">
                        <h4>Izradili</h4>
                        <p>Imana Purić</p>
                        <p>Esada Durmić</p>
                        <p>Adna Kargić</p>
                        <p className="footer-mail">contact@rosea.ba</p>
                    </div>

                </div>

                <div className="footer-bottom">
                    © 2025 Roséa. Sva prava zadržana.
                </div>
            </footer>

        </div>
    );
};

export default Shop;
