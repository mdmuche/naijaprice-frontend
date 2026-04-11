import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const AdminGuard = ({ children }) => {
  const { profile, isAdmin } = useSelector((state) => state.user);

  // Check both if they are logged in AND if they are an admin
  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};
