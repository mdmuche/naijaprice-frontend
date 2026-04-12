import {
  Bell,
  CirclePlus,
  MapPin,
  ShieldCheck,
  TrendingUp,
  User,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { getUserToken } from "../utils/getUserToken";
import { useSelector } from "react-redux";
import ThemeToggle from "./theme/ThemeToggle";

function DesktopNav() {
  const user = getUserToken();
  const { isAdmin } = useSelector((state) => state.user);
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 p-2.5 w-full rounded-lg transition-colors ${
      isActive
        ? "text-white bg-[#00C950] font-semibold"
        : "text-gray-600 hover:bg-gray-200"
    }`;
  return (
    <nav className="hidden md:flex fixed h-full w-64 flex-col gap-4 bg-gray-100 p-4">
      <Link to="/" className="flex w-full items-center gap-2 p-2.5">
        <img src="/images/logo.svg" alt="Logo" />
        <h3 className="text-2xl font-bold text-gray-900">NaijaPrice</h3>
      </Link>

      <div className="flex justify-end">
        <ThemeToggle />
      </div>

      <ul className="flex-1 space-y-1">
        <li>
          <NavLink to="/" className={navLinkClass}>
            <TrendingUp />
            <span>Prices</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/markets" className={navLinkClass}>
            <MapPin />
            <span>Markets</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-price" className={navLinkClass}>
            <CirclePlus />
            <span>Add Price</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/alerts" className={navLinkClass}>
            <Bell />
            <span>Alerts</span>
          </NavLink>
        </li>
        {user && (
          <li>
            <NavLink to="/profile" className={navLinkClass}>
              <User />
              <span>Profile</span>
            </NavLink>
          </li>
        )}
        {isAdmin && (
          <li>
            <NavLink to="/admin" className={navLinkClass}>
              <ShieldCheck />
              <span>Admin</span>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default DesktopNav;
