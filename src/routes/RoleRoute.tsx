import { Navigate, Outlet } from "react-router-dom";
import type { UserRole } from "../types/auth";
import { useAuth } from "../context/AuthContext";

interface RoleRouteProps {
    allowedRoles: UserRole[];
}

function RoleRoute({allowedRoles} : RoleRouteProps) {
    const { user, isAuthenticated } = useAuth();

    if(!isAuthenticated){
        return <Navigate to="/login" replace />;
    }

    if(!user || !allowedRoles.includes(user.role)){
        return <Navigate to="/customer/dashboard" replace />;
    }

    return <Outlet />;
}

export default RoleRoute;