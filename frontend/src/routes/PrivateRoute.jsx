import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, adminOnly = false }) => {
    const { korisnik } = useAuth();

    // login uvijek ako nije korisnik prijavljen
    if (!korisnik) {
        return <Navigate to="/login" />;
    }
    // ako je ruta samo za admina, a korisnik nije admin, preusmjerava se na shop page
    if (adminOnly && korisnik.uloga !== "ADMIN") {
        return <Navigate to="/shop" />;
    }

    return children;
};

export default PrivateRoute;
