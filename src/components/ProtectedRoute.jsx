import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  return !!localStorage.getItem("naijaprice_user_token");
};

function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to={"/login"} />;
}

export default ProtectedRoute;
