import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "../style/navbar.css"

const Navbar = () => {
    const navigate = useNavigate();
    const { korisnik, logout } = useAuth();

    const { korpa } = useCart();

    const brojArtikala = korpa.reduce((sum, p) => sum + p.kolicinaUKorpi, 0);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="navbar">
            <Link to="/" className="brand">Roséa</Link>

            <div className="nav-right">
                <div className="nav-links">

                    {korisnik && korisnik.uloga === "ADMIN" && (
                        <>
                            <Link to="/dashboard">Dashboard</Link>
                            <Link to="/narudzbe">Narudžbe</Link>
                        </>
                    )}

                    {korisnik && korisnik.uloga === "KORISNIK" && (
                        <>
                            <Link to="/shop">Shop</Link>
                            <Link to="/korpa">Korpa <span className="badge">{brojArtikala}</span></Link>
                            <Link to="/moje-narudzbe">Moje narudžbe</Link>
                        </>
                    )}

                    {!korisnik && (
                        <Link to="/login">Login</Link>
                    )}
                </div>

                {korisnik && (
                    <button
                        onClick={handleLogout}
                        className="btn"
                    >
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
