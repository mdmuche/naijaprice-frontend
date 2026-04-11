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
  LogOut,
  LogIn,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/slices/userSlice";

function MobileNav() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAdmin } = useSelector((state) => state.user);
  const { profile } = useSelector((state) => state.user);
  const user = profile;

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
    setOpen(false);
  };
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

          {user && (
            <NavLink
              to="/profile"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              <User size={20} />
              Profile
            </NavLink>
          )}

          {isAdmin && (
            <NavLink
              to="/admin"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              <ShieldCheck size={20} />
              Dashboard
            </NavLink>
          )}
          {user ? (
            <>
              <hr className="my-2" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50"
              >
                <LogOut size={16} />
                Log Out
              </button>
            </>
          ) : (
            <>
              <hr className="my-2" />
              <NavLink
                to="/login"
                className={navLinkClass}
                onClick={() => setOpen(false)}
              >
                <LogIn size={16} />
                Login
              </NavLink>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default MobileNav;
