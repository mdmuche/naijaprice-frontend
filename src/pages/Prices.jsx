import {
  ArrowDownUp,
  Bell,
  CirclePlus,
  Clock,
  MapPin,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import Navigation from "../components/Navigation";
import Feed from "../components/Feed";

function Prices() {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 p-2.5 w-fit rounded-lg transition-colors cursor-pointer ${
      isActive
        ? "text-white bg-[#00C950] font-semibold"
        : "text-gray-600 hover:bg-gray-200"
    }`;

  return (
    <div className="flex h-screen">
      <Navigation />
      <div className="w-[80%] flex flex-col gap-4 p-4 md:ml-64">
        <div className="flex items-center justify-between gap-4 mb-2 p-4 text-sm">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-[#00C950] text-sm" />
            <p>
              <span className="font-light text-gray-500">
                Lagos &gt; Kosofo &gt;
              </span>{" "}
              <span className="font-semibold">Mile 12 Market</span>
            </p>
            <div className="text-sm text-[#00C950] underline cursor-pointer">
              Change location
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Bell size={20} />
            <Clock className="text-gray-500" size={16} />
            <span className="text-gray-500">Last updated: 2mins ago</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 mb-4">
          <ul className="flex flex-wrap gap-2">
            <li className={navLinkClass({ isActive: true })}>All</li>
            <li className={navLinkClass({ isActive: false })}>Grains</li>
            <li className={navLinkClass({ isActive: false })}>Vegetables</li>
            <li className={navLinkClass({ isActive: false })}>Tubers</li>
            <li className={navLinkClass({ isActive: false })}>Protein</li>
            <li className={navLinkClass({ isActive: false })}>Oil</li>
          </ul>
          <div className="relative p-2">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />

            <input
              type="text"
              placeholder="Search commodities..."
              className="w-full pl-10 pr-4 py-2 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#00C950]"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between gap-4 mb-4 bg-gray-50 p-4">
            <div>
              <h2>Market Prices</h2>
              <p>Showing 8 commodities . Mile 12 Market, Lagos</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <SlidersHorizontal size={18} />
                <span>Filter</span>
              </div>
              <div className="flex items-center gap-4">
                <ArrowDownUp size={18} />
                <span>Sort by:Latest</span>
              </div>
              <div className="flex items-center gap-4">
                <CirclePlus size={18} />
                <span>Add Price</span>
              </div>
            </div>
          </div>
          <Feed />
        </div>
      </div>
    </div>
  );
}

export default Prices;
