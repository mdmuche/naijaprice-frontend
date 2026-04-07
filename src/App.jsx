import { Route, Routes } from "react-router-dom";

import Prices from "./pages/Prices";
import CreatePrice from "./pages/CreatePrice";
import Alerts from "./pages/Alerts";
import Profile from "./pages/Profile";
import Market from "./pages/Market";

import "./App.css";
import Commodity from "./pages/Commodity";
import SuggestMarket from "./pages/SuggestMarket";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Prices />} />
        <Route path="/commodities/:id" element={<Commodity />} />
        <Route path="/add-price" element={<CreatePrice />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/markets" element={<Market />} />
        <Route path="/suggest-market" element={<SuggestMarket />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
