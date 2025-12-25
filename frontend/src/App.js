import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProizvodiPage from "./pages/ProizvodiPage";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<Navigate to="/login" />} />

                <Route path="/login" element={<LoginPage />} />

                <Route
                    path="/proizvodi"
                    element={
                        <PrivateRoute>
                            <ProizvodiPage />
                        </PrivateRoute>
                    }
                />

            </Routes>
        </Router>
    );
}

export default App;
