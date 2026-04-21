import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
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
  CircleCheck,
  CirclePlus,
  Clock,
  FileChartColumn,
  Layers,
  MapPin,
  Search,
  Star,
  Users,
} from "lucide-react";
import Feed from "../components/Feed";
import PriceChart from "../components/PriceChart";
import PriceTrendCard from "../components/PriceTrendCard";
import SearchContainer from "../components/Search";
import Filter from "../components/Filter";
import { Link, useNavigate } from "react-router-dom";
import { markAllAsRead } from "../store/slices/alertSlice";
import { LastUpdated } from "../components/LastUpdated";
import Pagination from "../components/Pagination";
import AppShell from "../components/layout/AppShell";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import PageIntro from "../components/ui/PageIntro";
import EmptyState from "../components/ui/EmptyState";

function Prices() {
  const MotionOverlay = motion.div;
  const MotionModal = motion.div;
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const itemsPerPage = 8;
  const alerts = useSelector((state) => state.alerts.allAlerts);
  const unreadCount = alerts?.filter((alert) => !alert.read).length ?? 0;

  // prefered marketslogic
  const { profile } = useSelector((state) => state.user);
  const preferredIds = useMemo(() => {
    return profile?.preferredMarkets || [];
  }, [profile?.preferredMarkets]); // Only recreate this array if the actual data in Redux changes

  const {
    commodities,
    activeCategory,
    searchTerm,
    sortBy,
    trendTimeframe,
    filterSource,
    currentLocation,
  } = useSelector((state) => state.prices);
  const { allMarkets } = useSelector((state) => state.markets);

  const latestReport = commodities[0];

  // We want to identify which markets in your list are the user's favorites
  const enhancedMarkets = allMarkets.map((m) => ({
    ...m,
    isPreferred: preferredIds.some((fav) => (fav.id || fav) === m.id),
  }));

  const sortedFilteredMarkets = [...enhancedMarkets]
    .filter(
      (loc) =>
        loc.title.toLowerCase().includes(locationSearch.toLowerCase()) ||
        loc.location.toLowerCase().includes(locationSearch.toLowerCase()),
    )
    .sort((a, b) => b.isPreferred - a.isPreferred);

  const allMarketItems = commodities
    .filter((item) => {
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
      const dateA = a.createdAt ? new Date(a.createdAt) : 0;
      const dateB = b.createdAt ? new Date(b.createdAt) : 0;

      if (sortBy === "latest") return dateB - dateA;
      return 0;
    });

  const totalPages = Math.ceil(allMarketItems.length / itemsPerPage);
  const safePage = currentPage >= totalPages ? 0 : currentPage;
  const startIndex = safePage * itemsPerPage;
  const visibleItems = allMarketItems.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const currentMarketCommodities = commodities.filter(
    (commodity) => commodity.market === currentLocation.market,
  );
  const dropCount = currentMarketCommodities.filter(
    (commodity) => commodity.trendDirection === "down",
  ).length;
  const riseCount = currentMarketCommodities.filter(
    (commodity) => commodity.trendDirection === "up",
  ).length;
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
    `cursor-pointer rounded-2xl px-4 py-2.5 text-sm font-semibold transition-colors ${
      activeCategory === catName
        ? "bg-[#00C950] text-white shadow-sm"
        : "bg-white text-gray-600 hover:bg-gray-100"
    }`;

  const modalTransition = {
    initial: { opacity: 0, scale: 0.96, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.98, y: 6 },
    transition: { duration: 0.2, ease: "easeOut" },
  };
  useEffect(() => {
    // 1. Check if the user has any preferred markets
    if (preferredIds.length > 0) {
      const favoriteId = preferredIds[0]; // Get the first favorite
      const favoriteMarket = allMarkets.find((m) => m.id === favoriteId);

      if (favoriteMarket) {
        dispatch(
          setLocation({
            id: favoriteMarket.id,
            market: favoriteMarket.title,
            state: favoriteMarket.location.split(", ")[1] || "",
            lga: favoriteMarket.location.split(", ")[0] || "",
          }),
        );
      }
    } else {
      // 2. Fallback to Mile 12 if no favorites exist
      const mile12 = allMarkets.find((m) => m.id === 1); // Assuming ID 1 is Mile 12
      if (mile12) {
        dispatch(
          setLocation({
            id: mile12.id,
            market: mile12.title,
            state: mile12.location.split(", ")[1],
            lga: mile12.location.split(", ")[0],
          }),
        );
      }
    }
  }, [preferredIds, allMarkets, dispatch]);

  return (
    <AppShell contentClassName="space-y-6 px-3 py-4 md:px-6 md:py-6">
      {" "}
      {/* --- LOCATION STATUS CARD --- */}
      <Card
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        padding="md"
      >
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <MapPin size={16} className="text-[#00C950]" />
          <span>
            {currentLocation.state} &gt; {currentLocation.lga} &gt;{" "}
            <strong className="text-gray-900">{currentLocation.market}</strong>
          </span>
          <button
            type="button"
            className="font-semibold text-[#00C950] hover:underline"
            onClick={() => setIsLocationOpen(true)}
          >
            Change location
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock size={16} />
          {latestReport ? (
            <LastUpdated timestamp={latestReport.createdAt} />
          ) : (
            <span>Waiting for reports</span>
          )}
        </div>
      </Card>
      {/* --- HERO SECTION --- */}
      <div className="relative mb-8 overflow-hidden rounded-[40px] border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
        {/* Soft background glow effects */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#00C950]/5 blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-[#00C950]/5 blur-3xl"></div>

        <div className="relative z-10 flex flex-col items-center">
          <h1 className="mb-4 text-3xl font-black tracking-tight text-gray-900 sm:text-5xl">
            Nigeria's Real-Time{" "}
            <span className="text-[#00C950]">Food Price</span> Tracker
          </h1>

          <p className="mb-10 max-w-2xl text-base font-medium text-gray-400 sm:text-lg leading-relaxed">
            Track, compare, and verify food prices across markets — so you
            always buy at the right price.
          </p>

          <div className="flex flex-col-reverse sm:flex-row items-center gap-4">
            {/* Primary Action Button */}
            <button
              onClick={() => setIsLocationOpen(true)}
              className="flex items-center gap-2 rounded-full bg-[#00C950] px-4 sm:px-8 py-4 text-lg font-bold text-white shadow-[0_10px_20px_rgba(0,201,80,0.3)] transition-all hover:scale-105 active:scale-95"
            >
              <MapPin className="hidden sm:block" size={20} />
              Check Prices Near You
            </button>

            {/* Notification Bell with markAllAsRead logic */}
            <div
              onClick={() => {
                dispatch(markAllAsRead());
                navigate("/alerts");
              }}
              className="relative cursor-pointer rounded-full bg-[#1A1F2C] p-4 text-white shadow-lg transition-transform hover:scale-110"
            >
              <Bell size={24} />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold ring-4 ring-[#1A1F2C]">
                  {unreadCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* --- CATEGORIES & SEARCH CARD --- */}
      <Card className="space-y-5" padding="md">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <ul className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <li
                key={cat}
                className={navLinkClass(cat)}
                onClick={() => {
                  dispatch(setCategory(cat));
                  setCurrentPage(0);
                }}
              >
                {cat}
              </li>
            ))}
          </ul>
          <SearchContainer placeholder="Search commodities..." />
        </div>

        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Browse reports
            </h2>
            <p className="text-sm text-gray-500">
              Showing {visibleItems.length} of {allMarketItems.length} items
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Pagination
              page={safePage}
              totalPages={totalPages}
              onPrev={() => setCurrentPage((prev) => prev - 1)}
              onNext={() => setCurrentPage((prev) => prev + 1)}
              slider={false}
            />

            <Filter onClick={() => setIsFilterOpen(true)} />

            <Button
              variant={sortBy === "latest" ? "primary" : "secondary"}
              onClick={() => dispatch(setSortBy("latest"))}
            >
              <ArrowDownUp size={16} />
              {sortBy === "latest" ? "Sorted" : "Sort By Latest"}
            </Button>

            <Link to="/add-price">
              <Button>
                <CirclePlus size={16} />
                Add Price
              </Button>
            </Link>
          </div>
        </div>
      </Card>
      <Feed items={visibleItems} />
      <div className="grid gap-6 px-4 xl:grid-cols-[1.1fr_0.9fr]">
        <PriceChart className="w-full" />

        <Card className="space-y-5" padding="md">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Price Trends
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Quick market signals for {currentLocation.market}
            </p>
            <div className="mt-3 flex gap-3 text-sm">
              {["7d", "14d", "30d"].map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => dispatch(setTrendTimeframe(time))}
                  className={`font-medium transition-colors ${
                    trendTimeframe === time
                      ? "text-[#00C950]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <PriceTrendCard
              details="Cheaper today"
              items={dropCount}
              priceIcon="down"
              title="Price Drops"
              bgColor="bg-green-50"
            />
            <PriceTrendCard
              details="More expensive"
              items={riseCount}
              priceIcon="up"
              title="Price Rises"
              bgColor="bg-red-50"
            />
            <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-gray-200 p-2.5">
                  <FileChartColumn />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Reports Today</h3>
                  <p className="text-sm text-gray-500">
                    Verified market activity
                  </p>
                </div>
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {marketReports}
              </div>
            </div>
          </div>
        </Card>
      </div>
      <AnimatePresence>
        {isFilterOpen && (
          <MotionOverlay
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MotionModal
              {...modalTransition}
              className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                <button type="button" onClick={() => setIsFilterOpen(false)}>
                  x
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="mb-3 text-sm font-semibold tracking-wide text-gray-400">
                    SOURCE
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {["all", "verified", "crowdsourced"].map((src) => {
                      const Icon =
                        src === "verified"
                          ? CircleCheck
                          : src === "crowdsourced"
                            ? Users
                            : Layers; // Fallback icon for "all"

                      return (
                        <button
                          key={src}
                          type="button"
                          onClick={() => {
                            dispatch(setFilterSource(src));
                            setCurrentPage(0);
                          }}
                          className={`flex items-center justify-center gap-1.5 rounded-2xl border px-3 py-2 text-xs font-bold capitalize transition-colors ${
                            filterSource === src
                              ? "border-[#00C950] bg-[#00C950] text-white"
                              : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {/* Icon: Only visible on small screens */}
                          <span className="sm:hidden">
                            <Icon size={14} />
                          </span>

                          {/* Text: Only visible on small screens for "all", or larger screens for everything */}
                          <span
                            className={
                              src === "all" ? "block" : "hidden sm:block"
                            }
                          >
                            {src}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => {
                    dispatch(setFilterSource("all"));
                    setCurrentPage(0);
                    setIsFilterOpen(false);
                  }}
                >
                  Reset
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Apply
                </Button>
              </div>
            </MotionModal>
          </MotionOverlay>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isLocationOpen && (
          <MotionOverlay
            className="fixed inset-0 z-110 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MotionModal
              {...modalTransition}
              className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  Select Market
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setIsLocationOpen(false);
                    setLocationSearch("");
                  }}
                  className="rounded-full p-2 text-gray-400 hover:bg-gray-100"
                >
                  x
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
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-4 outline-none transition focus:border-[#00C950] focus:ring-4 focus:ring-[#00C950]/10"
                    autoFocus
                  />
                </div>

                <div className="max-h-60 space-y-2 overflow-y-auto pr-2">
                  {sortedFilteredMarkets.length > 0 ? (
                    sortedFilteredMarkets.map((loc) => (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => {
                          dispatch(
                            setLocation({
                              id: loc.id,
                              market: loc.title,
                              state: loc.location.split(", ")[1] || "",
                              lga: loc.location.split(", ")[0] || "",
                            }),
                          );
                          setIsLocationOpen(false);
                        }}
                        className={`w-full rounded-2xl border p-4 text-left transition-all ${
                          currentLocation.market === loc.title
                            ? "border-[#00C950] bg-green-50"
                            : "border-gray-200 bg-white hover:border-gray-100"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {loc.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {loc.location}
                            </p>
                          </div>

                          {/* This badge will only show if the ID match is successful */}
                          {loc.isPreferred && (
                            <div className="bg-[#00C950] text-white p-1 rounded-full">
                              <Star size={12} fill="currentColor" />
                            </div>
                          )}
                        </div>
                      </button>
                    ))
                  ) : (
                    <EmptyState
                      title="No markets found"
                      description="Try a broader location search."
                      className="py-8"
                    />
                  )}
                </div>
              </div>

              <Button
                className="mt-6 w-full"
                onClick={() => {
                  setIsLocationOpen(false);
                  setLocationSearch("");
                }}
              >
                Close
              </Button>
            </MotionModal>
          </MotionOverlay>
        )}
      </AnimatePresence>
    </AppShell>
  );
}

export default Prices;
