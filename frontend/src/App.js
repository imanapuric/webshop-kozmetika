import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

import Shop from "./pages/Shop";
import Korpa from "./pages/Korpa";
import Checkout from "./pages/Checkout";
import Narudzbe from "./pages/Narudzbe";
import MojeNarudzbe from "./pages/MojeNarudzbe";

import PrivateRoute from "./routes/PrivateRoute";

function App() {
    return (
        <Router>
            <Navbar />

            <Routes>
                {/* redirect */}
                <Route path="/" element={<Navigate to="/login" />} />

                {/* login */}
                <Route path="/login" element={<LoginPage />} />

                {/* dashboard (CRUD) */}
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

                {/* fallback */}
                <Route path="*" element={<h2 style={{ padding: "20px" }}>404 - Nema stranice</h2>} />
            </Routes>
        </Router>
    );
}

export default App;
