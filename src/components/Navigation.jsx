import { Bell, CirclePlus, MapPin, TrendingUp, User } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

function Navigation() {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 p-2.5 w-full rounded-lg transition-colors ${
      isActive
        ? "text-white bg-[#00C950] font-semibold"
        : "text-gray-600 hover:bg-gray-200"
    }`;

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden md:block fixed w-64 h-full bg-gray-100 p-4">
        <Link to="/" className="flex gap-2 items-center p-2.5 w-full">
          <img src="./images/logo.svg" alt="Logo" />
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
        </ul>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around md:hidden p-2">
        <NavLink to="/prices" className={navLinkClass}>
          <TrendingUp size={20} />
          <span className="text-xs">Prices</span>
        </NavLink>
        <NavLink to="/markets" className={navLinkClass}>
          <MapPin size={20} />
          <span className="text-xs">Markets</span>
        </NavLink>
        <NavLink to="/add-price" className={navLinkClass}>
          <CirclePlus size={20} />
          <span className="text-xs">Add</span>
        </NavLink>
        <NavLink to="/alerts" className={navLinkClass}>
          <Bell size={20} />
          <span className="text-xs">Alerts</span>
        </NavLink>
        <NavLink to="/profile" className={navLinkClass}>
          <User size={20} />
          <span className="text-xs">Profile</span>
        </NavLink>
      </nav>
    </>
  );
}

export default Navigation;
