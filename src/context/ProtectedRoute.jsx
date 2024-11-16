import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(UserContext);

  if (!user || !allowedRoles.includes(user.role)) {
    // Redirect to home or login if user is not allowed
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;