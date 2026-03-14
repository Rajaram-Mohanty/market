import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../state/store";
import { CircularProgress, Box } from "@mui/material";

interface RequireAuthProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const RequireAuth: React.FC<RequireAuthProps> = ({
  children,
  allowedRoles,
}) => {
  const location = useLocation();
  const jwt = localStorage.getItem("jwt");
  const { auth, seller } = useAppSelector((store) => store);

  if (!jwt) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const role =
    localStorage.getItem("role") || auth.user?.role || seller.profile?.role;

  const normalizedRole =
    role === "ROLE_COSTUMER" ? "ROLE_CUSTOMER" : (role as string | null);

  // If role is still loading via Redux and not in localStorage yet, show loader
  if (!normalizedRole) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  const roleHierarchy: Record<string, number> = {
    ROLE_CUSTOMER: 1,
    ROLE_COSTUMER: 1,
    ROLE_SELLER: 2,
    ROLE_ADMIN: 3,
  };

  if (allowedRoles && allowedRoles.length > 0) {
    // Check if the user's role is sufficient for any of the allowed roles
    const userRoleValue = roleHierarchy[normalizedRole] || 0;
    const isAllowed = allowedRoles.some((allowedRole) => {
      const allowedRoleValue = roleHierarchy[allowedRole] || 0;
      return userRoleValue >= allowedRoleValue;
    });

    if (!isAllowed) {
      // Priority diversion based on existing role
      if (normalizedRole === "ROLE_SELLER") {
        return <Navigate to="/seller" replace />;
      } else if (normalizedRole === "ROLE_ADMIN") {
        return <Navigate to="/admin" replace />;
      } else {
        // Default fallback for customer or any other unknown role
        return <Navigate to="/" replace />;
      }
    }
  }

  return <>{children}</>;
};

export default RequireAuth;
