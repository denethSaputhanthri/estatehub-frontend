import { Navigate, Route, Routes } from "react-router-dom";
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
import Bookings from "../pages/customer/Bookings";
import MyProperties from "../pages/seller/MyProperties";
import EditProperty from "../pages/seller/EditProperty";
import AddProperty from "../pages/seller/AddProperty";
import SellerBookings from "../pages/seller/SellerBookings";
import SellerInquiries from "../pages/seller/SellerInquiries";
import AgentInquiries from "../pages/agent/AgentInquiries";
import AgentBookings from "../pages/agent/AgentBookings";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageProperties from "../pages/admin/ManageProperties";
import ManageInquiries from "../pages/admin/ManageInquiries";


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
                    // Customer Bookings
                    <Route path="/customer/bookings"
                        element={<Bookings />} />
                
                    
                </Route>


                // Seller Routes
                <Route element={<RoleRoute allowedRoles={['SELLER']} />}>
                    // Seller Dashboard
                    <Route path="/seller/dashboard"
                        element={<SellerDashboard />} />
                    // Seller Properties
                    <Route path="/seller/properties"
                        element={<MyProperties />} />
                    // Seller Edit Property
                    <Route path="/seller/edit-property"
                        element={<EditProperty />} />
                    // Seller Add Property
                    <Route path="/seller/add-property"
                        element={<AddProperty />} />
                    // Seller Inquiries
                    <Route path="/seller/inquiries"
                        element={<SellerInquiries />} />
                    // Seller Bookings
                    <Route path="/seller/bookings"
                        element={<SellerBookings />} />

              </Route>


                // Agent Routes
                <Route element={<RoleRoute allowedRoles={['AGENT']} />}>
                    // Agent Dashboard
                    <Route path="/agent/dashboard"
                        element={<AgentDashboard/>} />
                    // Agent Inquiries
                    <Route path="/agent/inquiries"
                        element={<AgentInquiries />}/>
                    // Agent Bookings
                    <Route path="/agent/bookings"
                        element={<AgentBookings />}/>
                </Route>
                

                // Admin Routes
                <Route element={<RoleRoute allowedRoles={['ADMIN']} />}>
                    // Admin Dashboard
                    <Route path="/admin/dashboard" 
                        element={<AdminDashboard />} />
                    // Admin Users
                    <Route path="/admin/users"
                        element={<ManageUsers />} />
                    // Admin Properties
                    <Route path="/admin/properties"
                        element={<ManageProperties />} />
                    // Admin Inquiries
                    <Route path="/admin/transactions"
                        element={<ManageInquiries />}/>

                </Route>
            </Route>
        </Routes>
    );
}
export default AppRoutes;   