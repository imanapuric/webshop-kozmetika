import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "../style/navbar.css";
import logo from "../picture/logo.png";

import {
    FiGrid,
    FiPackage,
    FiShoppingBag,
    FiShoppingCart,
    FiLogOut
} from "react-icons/fi";

const Navbar = () => {
    const navigate = useNavigate();
    const { korisnik, logout } = useAuth();
    const { korpa } = useCart();

    const brojArtikala = korpa.reduce(
        (sum, p) => sum + p.kolicinaUKorpi,
        0
    );

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">

            {/* LOGO / BRAND */}
            <Link to="/" className="brand">
                <img src={logo} alt="Roséa logo" className="brand-logo" />
            </Link>

            {/* DESNA STRANA */}
            <div className="nav-right">

                {/* LINKOVI */}
                <div className="nav-links">

                    {korisnik && korisnik.uloga === "ADMIN" && (
                        <>
                            <Link to="/dashboard" className="nav-link">
                                <FiGrid />
                                <span>Dashboard</span>
                            </Link>

                            <Link to="/narudzbe" className="nav-link">
                                <FiPackage />
                                <span>Narudžbe</span>
                            </Link>
                        </>
                    )}

                    {korisnik && korisnik.uloga === "KORISNIK" && (
                        <>
                            <Link to="/shop" className="nav-link">
                                <FiShoppingBag />
                                <span>Shop</span>
                            </Link>

                            <Link to="/korpa" className="nav-link">
                                <FiShoppingCart />
                                <span>Korpa</span>
                                <span className="badge">{brojArtikala}</span>
                            </Link>

                            <Link to="/moje-narudzbe" className="nav-link">
                                <FiPackage />
                                <span>Moje narudžbe</span>
                            </Link>
                        </>
                    )}

                    {!korisnik && (
                        <Link to="/login" className="nav-link">
                            Login
                        </Link>
                    )}
                </div>

                {/* LOGOUT */}
                {korisnik && (
                    <button
                        onClick={handleLogout}
                        className="btn logout-btn"
                    >
                        <FiLogOut />
                        <span>Logout</span>
                    </button>
                )}

            </div>
        </nav>
    );
};

export default Navbar;
