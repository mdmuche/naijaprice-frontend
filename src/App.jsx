import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Prices from "./pages/Prices";
import CreatePrice from "./pages/CreatePrice";
import Alerts from "./pages/Alerts";
import Profile from "./pages/Profile";
import Market from "./pages/Market";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prices" element={<Prices />} />
        <Route path="/add-price" element={<CreatePrice />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/markets" element={<Market />} />
      </Routes>
    </>
  );
}

export default App;
