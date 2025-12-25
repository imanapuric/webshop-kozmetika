import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
    const { korisnik } = useAuth();
    return korisnik ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
