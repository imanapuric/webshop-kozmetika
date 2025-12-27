import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, adminOnly = false }) => {
    const { korisnik } = useAuth();

    // nije ulogovan
    if (!korisnik) {
        return <Navigate to="/login" />;
    }

    // samo admin smije
    if (adminOnly && korisnik.uloga !== "ADMIN") {
        return <Navigate to="/shop" />;
    }

    return children;
};

export default PrivateRoute;
