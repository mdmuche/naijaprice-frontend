import { Route, Routes } from "react-router-dom";

import Prices from "./pages/Prices";
import CreatePrice from "./pages/CreatePrice";
import Alerts from "./pages/Alerts";
import Profile from "./pages/Profile";
import Market from "./pages/Market";
import Commodity from "./pages/Commodity";
import SuggestMarket from "./pages/SuggestMarket";
import AdminDashboard from "./pages/AdminDashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AdminGuard } from "./components/AdminGuard";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Prices />} />
        <Route path="/commodities/:id" element={<Commodity />} />

        <Route
          path="/add-price"
          element={
            <ProtectedRoute>
              <CreatePrice />
            </ProtectedRoute>
          }
        />
        <Route path="/alerts" element={<Alerts />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/markets" element={<Market />} />
        <Route path="/suggest-market" element={<SuggestMarket />} />
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminDashboard />
            </AdminGuard>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
