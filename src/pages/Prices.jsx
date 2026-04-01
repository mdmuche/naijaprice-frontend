import {
  ArrowDownUp,
  Bell,
  CirclePlus,
  Clock,
  FileChartColumn,
  MapPin,
  SlidersHorizontal,
} from "lucide-react";
import Navigation from "../components/Navigation";
import Feed from "../components/Feed";
import PriceChart from "../components/PriceChart";
import PriceTrendCard from "../components/PriceTrendCard";
import SearchContainer from "../components/Search";
import Filter from "../components/Filter";

function Prices() {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 p-2.5 w-fit rounded-lg transition-colors cursor-pointer ${
      isActive
        ? "text-white bg-[#00C950] font-semibold"
        : "text-gray-600 hover:bg-gray-200"
    }`;

  return (
    <div className="flex h-screen justify-between">
      <Navigation />
      <div className="flex-1 flex flex-col gap-4 p-1 md:ml-64 md:p-4 sm:p-2">
        <div className="flex flex-col items-start justify-between gap-4 mb-2 p-4 text-xs lg:text-sm lg:flex-row lg:items-center">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
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
          <SearchContainer placeholder={"Search commodities..."} />
        </div>
        <div>
          <div className="flex flex-col items-start justify-between gap-4 mb-4 bg-gray-50 p-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-lg font-semibold">Market Prices</h2>
              <p className="text-sm text-gray-500">
                Showing 8 commodities . Mile 12 Market, Lagos
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Filter />
              <div className="flex items-center gap-4 rounded-lg bg-white text-black font-normal px-4 py-2 cursor-pointer">
                <ArrowDownUp size={18} />
                <span className="hidden sm:block">Sort by:Latest</span>
              </div>
              <div className="flex items-center gap-4 rounded-lg bg-[#00C950] text-white px-4 py-2 cursor-pointer">
                <CirclePlus size={18} />
                <span className="hidden sm:block">Add Price</span>
              </div>
            </div>
          </div>
          <Feed />
          {/* Price Trends and Market Summary */}
          <div className="flex flex-col gap-4 xl:justify-between items-stretch p-4 xl:flex-row">
            <PriceChart className="w-full 2xl:w-[55%]" />
            <div className="w-full p-4 bg-white rounded-xl shadow-sm xl:w-[43%]">
              <div>
                <h2 className="text-lg font-semibold">
                  Price Trends - Mile 12 Market
                </h2>
                <span className="text-sm text-gray-500">
                  Last 30 days - top commodities
                </span>
              </div>
              <div className="flex flex-col gap-4 mt-4">
                <PriceTrendCard
                  details={"Commodities cheaper today"}
                  items={4}
                  priceIcon={"down"}
                  title={"Price Drops"}
                  bgColor={"bg-[#C6F6D4]/50"}
                />
                <PriceTrendCard
                  details={"Commodities more expensive today"}
                  items={4}
                  priceIcon={"up"}
                  title={"Price Rises"}
                  bgColor={"bg-[#FECACA]/50"}
                />
                <div className="bg-black/20 p-4 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-200 w-fit rounded-full">
                        <FileChartColumn />
                      </div>
                      <div>
                        <h3 className="font-semibold">Reports Today</h3>
                        <p className={`text-sm `}>Verified Submissions</p>
                      </div>
                    </div>

                    <div className={"font-semibold"}>127</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prices;
