import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ScoutGuard = ({ children }) => {
  const { profile } = useSelector((state) => state.user);

  // 1. If no profile exists, they aren't logged in
  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  // 2. Check if the role is either 'admin' or 'scout'
  const isAuthorized = profile.role === "admin" || profile.role === "scout";

  if (!isAuthorized) {
    // unauthorized if they are a regular 'user'
    return <Navigate to="/unauthorized" replace />;
  }

  // 3. render the children (the Add Alert page)
  return children;
};
