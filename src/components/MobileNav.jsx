import { useState } from "react";
import {
  TrendingUp,
  MapPin,
  CirclePlus,
  Bell,
  User,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function MobileNav() {
  const [open, setOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg ${
      isActive ? "bg-[#00C950] text-white" : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="md:hidden">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-100 bg-white flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/images/logo.svg" alt="Logo" className="w-6 h-6" />
          <h3 className="font-bold text-lg">NaijaPrice</h3>
        </div>
        {/* Hamburger */}
        <button onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-white shadow-md flex flex-col gap-2 p-4">
          <NavLink
            to="/"
            className={navLinkClass}
            onClick={() => setOpen(false)}
          >
            <TrendingUp size={20} />
            Prices
          </NavLink>

          <NavLink
            to="/markets"
            className={navLinkClass}
            onClick={() => setOpen(false)}
          >
            <MapPin size={20} />
            Markets
          </NavLink>

          <NavLink
            to="/add-price"
            className={navLinkClass}
            onClick={() => setOpen(false)}
          >
            <CirclePlus size={20} />
            Add Price
          </NavLink>

          <NavLink
            to="/alerts"
            className={navLinkClass}
            onClick={() => setOpen(false)}
          >
            <Bell size={20} />
            Alerts
          </NavLink>

          <NavLink
            to="/profile"
            className={navLinkClass}
            onClick={() => setOpen(false)}
          >
            <User size={20} />
            Profile
          </NavLink>

          <NavLink
            to="/admin"
            className={navLinkClass}
            onClick={() => setOpen(false)}
          >
            <ShieldCheck size={20} />
            Admin
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default MobileNav;
