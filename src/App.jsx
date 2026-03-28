import { Route, Routes } from "react-router-dom";

import Prices from "./pages/Prices";
import CreatePrice from "./pages/CreatePrice";
import Alerts from "./pages/Alerts";
import Profile from "./pages/Profile";
import Market from "./pages/Market";

import "./App.css";
import Commodity from "./pages/Commodity";

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
      </Routes>
    </>
  );
}

export default App;
