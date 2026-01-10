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

// komponenta za navbar

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

            {/* rosea logo */}
            <Link to="/" className="brand">
                <img src={logo} alt="Roséa logo" className="brand-logo" />
            </Link>

            {/* sadržaj desne strane navbara ovisit će o ulozi */}
            <div className="nav-right">

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

                {/* dugme za odjavu ; neovisno o ulozi */}
                {korisnik && (
                    <button
                        onClick={handleLogout}
                        className="btn logout-btn"
                    >
                        <FiLogOut />
                        <span>Odjavi se</span>
                    </button>
                )}

            </div>
        </nav>
    );
};

export default Navbar;
