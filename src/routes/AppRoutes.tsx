import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import ProtectedRoute from "./ProtectedRoute";
import CustomerDashboard from "../pages/customer/CustomerDashboard"
import RoleRoute from "./RoleRoute";
import SellerDashboard from "../pages/seller/SellerDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AgentDashboard from "../pages/agent/AgentDashboard";
import Properties from "../pages/customer/Properties";
import PropertyDetails from "../pages/customer/PropertyDetails";
import Inquiries from "../pages/customer/Inquiries";


function AppRoutes() {
    return (
        <Routes>

            // Public Routes
            <Route path="/login" element={<Login />} />

            // Protected Routes

            <Route element={<ProtectedRoute />}>

                // Customer Routes
                <Route element={<RoleRoute allowedRoles={['CUSTOMER']} />}>
                    // Customer Dashboard
                    <Route path="/customer/dashboard"
                        element={<CustomerDashboard />} />
                    // Customer Properties
                    <Route path="/customer/properties"
                        element={<Properties />} />
                    // Customer Property Details
                    <Route path="/customer/properties/:id"
                        element={<PropertyDetails />} />
                    // Customer Inquiries
                    <Route path="/customer/inquiries"
                        element={<Inquiries />} />
                    
                </Route>


                // Seller Routes
                <Route element={<RoleRoute allowedRoles={['SELLER']} />}>
                    <Route path="/seller/dashboard"
                        element={<SellerDashboard />} />
                </Route>


                // Agent Routes
                <Route element={<RoleRoute allowedRoles={['AGENT']} />}>
                    <Route path="/agent/dashboard"
                        element={<AgentDashboard />} />
                </Route>
                

                // Admin Routes
                <Route element={<RoleRoute allowedRoles={['ADMIN']} />}>
                    <Route path="/admin/dashboard" 
                        element={<AdminDashboard />} />
                </Route>
            </Route>
        </Routes>
    );
}
export default AppRoutes;   