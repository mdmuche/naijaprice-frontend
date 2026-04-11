import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  setCategory,
  setSortBy,
  setTrendTimeframe,
  setFilterSource,
  setLocation,
} from "../store/slices/priceSlice";
import {
  ArrowDownUp,
  Bell,
  CirclePlus,
  Clock,
  FileChartColumn,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import Navigation from "../components/Navigation";
import Feed from "../components/Feed";
import PriceChart from "../components/PriceChart";
import PriceTrendCard from "../components/PriceTrendCard";
import SearchContainer from "../components/Search";
import Filter from "../components/Filter";
import { Link } from "react-router-dom";

function Prices() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const dispatch = useDispatch();

  const {
    commodities,
    activeCategory,
    searchTerm,
    sortBy,
    trendTimeframe,
    filterSource,
    currentLocation,
  } = useSelector((state) => state.prices);

  const marketsList = [
    { state: "Lagos", lga: "Kosofe", market: "Mile 12 Market" },
    { state: "Lagos", lga: "Mushin", market: "Ojuwoye Market" },
    { state: "Lagos", lga: "Ikeja", market: "Computer Village" },
    { state: "Oyo", lga: "Ibadan North", market: "Bodija Market" },
    { state: "Abuja", lga: "AMAC", market: "Wuse Market" },
    { state: "Abuja", lga: "Gwagwalada", market: "Gwagwalada Market" },
    { state: "Kano", lga: "Fagge", market: "Kantin Kwori" },
    { state: "Rivers", lga: "Port Harcourt", market: "Oil Mill Market" },
  ];

  const filteredMarkets = marketsList.filter(
    (loc) =>
      loc.market.toLowerCase().includes(locationSearch.toLowerCase()) ||
      loc.state.toLowerCase().includes(locationSearch.toLowerCase()),
  );

  // Logic: Filter and Sort
  const allMarketItems = commodities
    .filter((item) => {
      // 1. STRICT MARKET CHECK
      // Only show if the item explicitly belongs to the selected market
      const matchesMarket = item.market === currentLocation.market;

      const matchesCat =
        activeCategory === "All" || item.category === activeCategory;
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesSource =
        filterSource === "all" || item.source === filterSource;

      return matchesMarket && matchesCat && matchesSearch && matchesSource;
    })
    .sort((a, b) => {
      // 5. Ensure the 'createdAt' actually exists to avoid NaN errors
      const dateA = a.createdAt ? new Date(a.createdAt) : 0;
      const dateB = b.createdAt ? new Date(b.createdAt) : 0;

      if (sortBy === "latest") return dateB - dateA;
      return 0;
    });

  // Pagination Logic
  const totalPages = Math.ceil(allMarketItems.length / itemsPerPage);
  // Ensure we don't stay on a high page number if the list shrinks
  const safePage = currentPage >= totalPages ? 0 : currentPage;

  const startIndex = safePage * itemsPerPage;
  const visibleItems = allMarketItems.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
  const hasMore = allMarketItems.length > itemsPerPage;

  // 1. First, get only commodities for the current selected market
  const currentMarketCommodities = commodities.filter(
    (c) => c.market === currentLocation.market,
  );

  // 2. Calculate drops and rises ONLY for this market
  const dropCount = currentMarketCommodities.filter(
    (c) => c.trendDirection === "down",
  ).length;

  const riseCount = currentMarketCommodities.filter(
    (c) => c.trendDirection === "up",
  ).length;

  // 3. (Optional) Get a count of reports specifically for this market
  const marketReports = currentMarketCommodities.length;

  const categories = [
    "All",
    "Grains",
    "Vegetables",
    "Tubers",
    "Protein",
    "Oil",
  ];

  const navLinkClass = (catName) =>
    `flex items-center gap-2 p-2.5 w-fit rounded-lg transition-colors cursor-pointer ${
      activeCategory === catName
        ? "text-white bg-[#00C950] font-semibold"
        : "text-gray-600 hover:bg-gray-200"
    }`;

  return (
    <div className="flex h-screen justify-between relative">
      <Navigation />
      <div className="flex-1 flex flex-col gap-4 p-1 mt-4 lg:mt-0 md:ml-64 md:p-4 sm:p-2 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 mb-2 p-4 text-xs lg:text-sm lg:flex-row lg:items-center">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
            <MapPin size={16} className="text-[#00C950]" />
            <p>
              <span className="font-light text-gray-500">
                {currentLocation.state} &gt; {currentLocation.lga} &gt;
              </span>{" "}
              <span className="font-semibold">{currentLocation.market}</span>
            </p>
            <div
              className="text-sm text-[#00C950] underline cursor-pointer"
              onClick={() => setIsLocationOpen(true)}
            >
              Change location
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Bell size={20} />
            <Clock className="text-gray-500" size={16} />
            <span className="text-gray-500">Last updated: 2mins ago</span>
          </div>
        </div>

        {/* Category & Search */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 mb-4">
          <ul className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <li
                key={cat}
                className={navLinkClass(cat)}
                onClick={() => {
                  dispatch(setCategory(cat));
                  setCurrentPage(0); // Reset page on category change
                }}
              >
                {cat}
              </li>
            ))}
          </ul>
          <SearchContainer placeholder={"Search commodities..."} />
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col items-start justify-between gap-4 mb-4 bg-gray-50 p-4 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-lg font-semibold">Market Prices</h2>
            <p className="text-sm text-gray-500">
              Showing {visibleItems.length} of {allMarketItems.length} items
            </p>
          </div>

          {/* Slider Controls */}
          {hasMore && (
            <div className="flex items-center gap-3 bg-white p-1 rounded-xl border border-gray-200">
              <button
                disabled={safePage === 0}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className={`p-2 rounded-lg transition-all ${
                  safePage === 0
                    ? "text-gray-300"
                    : "text-[#00C950] hover:bg-green-50"
                }`}
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-xs font-bold text-gray-600">
                Page {safePage + 1} of {totalPages}
              </span>
              <button
                disabled={startIndex + itemsPerPage >= allMarketItems.length}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className={`p-2 rounded-lg transition-all ${
                  startIndex + itemsPerPage >= allMarketItems.length
                    ? "text-gray-300"
                    : "text-[#00C950] hover:bg-green-50"
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          <div className="flex items-center gap-4">
            <Filter onClick={() => setIsFilterOpen(true)} />
            <div
              className={`flex items-center gap-4 rounded-lg px-4 py-2 cursor-pointer transition-all ${
                sortBy === "latest"
                  ? "bg-[#00C950] text-white border-[#00C950]"
                  : "bg-white text-black"
              }`}
              onClick={() => dispatch(setSortBy("latest"))}
            >
              <ArrowDownUp size={18} />
              <span className="hidden sm:block">
                {sortBy === "latest" ? "Sorted" : "Sort By Latest"}
              </span>
            </div>
            <Link to={"/add-price"}>
              <div className="flex items-center gap-4 rounded-lg bg-[#00C950] text-white px-4 py-2">
                <CirclePlus size={18} />
                <span className="hidden sm:block">Add Price</span>
              </div>
            </Link>
          </div>
        </div>

        <Feed items={visibleItems} />

        {/* Analytics & Trends */}
        <div className="flex flex-col gap-4 xl:justify-between items-stretch p-4 xl:flex-row">
          <PriceChart className="w-full xl:w-[55%]" />
          <div className="w-full p-4 bg-white rounded-xl shadow-sm xl:w-[43%]">
            <h2 className="text-lg font-semibold">Price Trends</h2>
            <div className="flex gap-2 text-xs mt-1">
              {["7d", "14d", "30d"].map((time) => (
                <span
                  key={time}
                  onClick={() => dispatch(setTrendTimeframe(time))}
                  className={`cursor-pointer ${
                    trendTimeframe === time
                      ? "text-[#00C950] font-bold"
                      : "text-gray-500"
                  }`}
                >
                  {time}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <PriceTrendCard
                details={"Cheaper today"}
                items={dropCount}
                priceIcon={"down"}
                title={"Price Drops"}
                bgColor={"bg-green-50"}
              />
              <PriceTrendCard
                details={"More expensive"}
                items={riseCount}
                priceIcon={"up"}
                title={"Price Rises"}
                bgColor={"bg-red-50"}
              />
              <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-200 rounded-full">
                    <FileChartColumn />
                  </div>
                  <div>
                    <h3 className="font-semibold">Reports Today</h3>
                    <p className="text-sm">Verified</p>
                  </div>
                </div>
                <div className="font-semibold text-lg">{marketReports}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER MODAL */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Filters</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-gray-400 mb-3">
                  SOURCE
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {["all", "verified", "crowdsourced"].map((src) => (
                    <button
                      key={src}
                      onClick={() => {
                        dispatch(setFilterSource(src));
                        setCurrentPage(0); // Reset page on source change
                      }}
                      className={`py-2 rounded-xl text-xs font-bold capitalize border-2 transition-all ${
                        filterSource === src
                          ? "bg-[#00C950] text-white border-[#00C950]"
                          : "bg-white text-gray-500 border-gray-100"
                      }`}
                    >
                      {src}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 flex gap-3">
              <button
                className="flex-1 py-3 bg-gray-100 rounded-xl font-bold"
                onClick={() => {
                  dispatch(setFilterSource("all"));
                  setCurrentPage(0);
                  setIsFilterOpen(false);
                }}
              >
                Reset
              </button>
              <button
                className="flex-1 py-3 bg-black text-white rounded-xl font-bold"
                onClick={() => setIsFilterOpen(false)}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LOCATION MODAL */}
      {isLocationOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Select Market</h3>
              <button
                onClick={() => {
                  setIsLocationOpen(false);
                  setLocationSearch("");
                }}
                className="text-gray-400 p-2"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search markets..."
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#00C950] outline-none"
                  autoFocus
                />
              </div>
              <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
                {filteredMarkets.map((loc, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      dispatch(setLocation(loc));
                      setCurrentPage(0); // Reset page on location change
                      setIsLocationOpen(false);
                      setLocationSearch("");
                    }}
                    className={`p-4 border rounded-2xl cursor-pointer transition-all ${
                      currentLocation.market === loc.market
                        ? "border-[#00C950] bg-green-50"
                        : "border-gray-100 hover:bg-gray-50"
                    }`}
                  >
                    <p className="font-semibold text-gray-800">{loc.market}</p>
                    <p className="text-xs text-gray-500">
                      {loc.state}, {loc.lga}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => {
                setIsLocationOpen(false);
                setLocationSearch("");
              }}
              className="w-full mt-6 py-4 bg-[#00C950] text-white rounded-2xl font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Prices;
