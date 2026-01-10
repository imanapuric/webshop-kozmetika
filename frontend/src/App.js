import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";

import Shop from "./pages/Shop";
import Korpa from "./pages/Korpa";
import Checkout from "./pages/Checkout";
import Narudzbe from "./pages/Narudzbe";
import MojeNarudzbe from "./pages/MojeNarudzbe";

import PrivateRoute from "./routes/PrivateRoute";

function AppContent() {
    const location = useLocation();

    return (
        <>
            {/*sakrit će navbar u login i register page jer nije potreban*/}
            {location.pathname !== "/login" && location.pathname !== "/register" && <Navbar />}

            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* adminov dashboard (CRUD) */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute adminOnly={true}>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />

                {/* shop */}
                <Route path="/shop" element={<Shop />} />

                {/* korpa */}
                <Route path="/korpa" element={<Korpa />} />

                {/* checkout */}
                <Route path="/checkout" element={<Checkout />} />

                {/* sve narudzbe vidi samo admin */}
                <Route
                    path="/narudzbe"
                    element={
                        <PrivateRoute adminOnly={true}>
                            <Narudzbe />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/moje-narudzbe"
                    element={
                        <PrivateRoute>
                            <MojeNarudzbe />
                        </PrivateRoute>
                    }
                />

                {/* error page */}
                <Route path="*" element={<h2 style={{ padding: "20px" }}>404 - Nema stranice</h2>} />
            </Routes>
        </>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
