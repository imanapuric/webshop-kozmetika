import { useMemo } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "../style/korpa.css";

const Korpa = () => {
    const { korpa, ukloniIzKorpe, promijeniKolicinu, ocistiKorpu } = useCart();

    const ukupno = useMemo(() => {
        return korpa.reduce((sum, p) => sum + Number(p.cijena) * p.kolicinaUKorpi, 0);
    }, [korpa]);

    return (
        <div className="korpa">
            <div className="korpa-header">
                <div>
                    <h1>Korpa</h1>
                    <p className="korpa-subtitle">
                        {korpa.length === 0
                            ? "Trenutno nema proizvoda u korpi."
                            : `U korpi imate ${korpa.length} ${korpa.length === 1 ? "proizvod" : "proizvoda"}.`}
                    </p>
                </div>

                <div className="korpa-actions">
                    <Link to="/shop">
                        <button className="btn-secondary">⬅ Nazad u shop</button>
                    </Link>

                    <Link to="/checkout" className={korpa.length === 0 ? "disabled-link" : ""}>
                        <button className="checkout-btn" disabled={korpa.length === 0}>
                            Nastavi na checkout
                        </button>
                    </Link>
                </div>
            </div>

            {korpa.length === 0 ? (
                <div className="korpa-empty">
                    <div className="empty-icon">🛍️</div>
                    <h2>Korpa je prazna</h2>
                    <p>Dodaj proizvode iz shop-a i vrati se ovdje.</p>
                    <Link to="/shop">
                        <button className="empty-btn">Idi u shop</button>
                    </Link>
                </div>
            ) : (
                <div className="korpa-grid">
                    {/* LEFT: items */}
                    <div className="korpa-items">
                        {korpa.map((p) => (
                            <div key={p.id} className="cart-item">
                                <div className="cart-item-main">
                                    <div className="cart-item-info">
                                        <h3 className="cart-title">{p.naziv}</h3>
                                        <p className="cart-meta">{Number(p.cijena).toFixed(2)} KM / kom</p>
                                    </div>

                                    <button
                                        className="btn-remove"
                                        onClick={() => ukloniIzKorpe(p.id)}
                                        title="Ukloni iz korpe"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div className="cart-item-bottom">
                                    <div className="qty-control">
                                        <button
                                            type="button"
                                            className="qty-btn"
                                            onClick={() => promijeniKolicinu(p.id, Math.max(1, p.kolicinaUKorpi - 1))}
                                        >
                                            −
                                        </button>

                                        <input
                                            type="number"
                                            min="1"
                                            value={p.kolicinaUKorpi}
                                            onChange={(e) => promijeniKolicinu(p.id, e.target.value)}
                                            className="qty-input"
                                        />

                                        <button
                                            type="button"
                                            className="qty-btn"
                                            onClick={() => promijeniKolicinu(p.id, Number(p.kolicinaUKorpi) + 1)}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div className="cart-item-total">
                                        <span>Ukupno</span>
                                        <strong>
                                            {(Number(p.cijena) * Number(p.kolicinaUKorpi)).toFixed(2)} KM
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT: summary */}
                    <aside className="korpa-summary">
                        <h3>Sažetak narudžbe</h3>

                        <div className="summary-row">
                            <span>Međuzbroj</span>
                            <strong>{ukupno.toFixed(2)} KM</strong>
                        </div>

                        <div className="summary-row">
                            <span>Dostava</span>
                            <strong>0.00 KM</strong>
                        </div>

                        <div className="summary-divider" />

                        <div className="summary-row total">
                            <span>Ukupno</span>
                            <strong>{ukupno.toFixed(2)} KM</strong>
                        </div>

                        <Link to="/checkout">
                            <button className="summary-checkout">Nastavi na checkout</button>
                        </Link>

                        <button className="summary-clear" onClick={ocistiKorpu}>
                            Očisti korpu
                        </button>
                    </aside>
                </div>
            )}
        </div>
    );
};

export default Korpa;
