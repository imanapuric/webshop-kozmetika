import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { korisnik, logout } = useAuth();

    const { korpa } = useCart();

    const brojArtikala = korpa.reduce((sum, p) => sum + p.kolicinaUKorpi, 0);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const linkStyle = {
        color: "#fff",
        marginRight: "15px",
        textDecoration: "none"
    };

    return (
        <div style={{
            background: "#222",
            color: "#fff",
            padding: "15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <h2 style={{ margin: 0 }}>Webshop</h2>

            <div style={{ display: "flex", alignItems: "center" }}>
                <Link style={linkStyle} to="/shop">Shop</Link>

                <Link style={linkStyle} to="/korpa">
                    Korpa ({brojArtikala})
                </Link>

                {korisnik && korisnik.uloga === "ADMIN" && (
                    <>
                        <Link style={linkStyle} to="/dashboard">Dashboard</Link>
                        <Link style={linkStyle} to="/narudzbe">Narudžbe</Link>
                    </>
                )}

                {korisnik && korisnik.uloga === "CUSTOMER" && (
                    <>
                        <Link style={linkStyle} to="/moje-narudzbe">Moje narudžbe</Link>
                    </>
                )}

                {korisnik ? (
                    <button
                        onClick={handleLogout}
                        style={{
                            background: "red",
                            color: "white",
                            border: "none",
                            padding: "6px 12px",
                            cursor: "pointer",
                            borderRadius: "5px"
                        }}
                    >
                        Logout
                    </button>
                ) : (
                    <Link style={linkStyle} to="/login">Login</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
