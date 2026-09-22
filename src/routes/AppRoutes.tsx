import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import ProtectedRoute from "./ProtectedRoute";

function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}

function AppRoutes() {
    return (
        <Routes>

            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>
        </Routes>
    );
}
export default AppRoutes;