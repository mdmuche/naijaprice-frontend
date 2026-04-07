import {
  Bell,
  CirclePlus,
  MapPin,
  ShieldCheck,
  TrendingUp,
  User,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

function DesktopNav() {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 p-2.5 w-full rounded-lg transition-colors ${
      isActive
        ? "text-white bg-[#00C950] font-semibold"
        : "text-gray-600 hover:bg-gray-200"
    }`;
  return (
    <nav className="hidden md:block fixed w-64 h-full bg-gray-100 p-4">
      <Link to="/" className="flex gap-2 items-center p-2.5 w-full">
        <img src="/images/logo.svg" alt="Logo" />
        <h3 className="text-2xl font-bold">NaijaPrice</h3>
      </Link>

      <ul>
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
        <li>
          <NavLink to="/profile" className={navLinkClass}>
            <User />
            <span>Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin" className={navLinkClass}>
            <ShieldCheck />
            <span>Admin</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default DesktopNav;
