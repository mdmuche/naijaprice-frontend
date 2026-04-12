import { useState, useEffect } from "react";
import {
  Settings as SettingsIcon,
  Plus,
  MapPin,
  Activity,
  ArrowLeft,
} from "lucide-react";
import Navigation from "../components/Navigation";
import AlertList from "../components/Alerts";
import AddAlertForm from "../components/AddAlertForm";
import SettingsPage from "../components/Settings";
import Btn from "../components/Btn";
import BtnSecondary from "../components/BtnSecondary";
import { allMarketsData } from "../utils/marketData";
import { INITIAL_ALERTS } from "../utils/alertsData";
import { useSelector } from "react-redux";
import Pagination from "../components/Pagination";

function Alerts() {
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [isAdding, setIsAdding] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState("alerts");
  const [userMarket, setUserMarket] = useState(null);

  const user = useSelector((state) => state.user.profile);
  const tabs = user ? ["alerts", "predictions"] : ["alerts"];
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  // 1. Distance Calculation Logic
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // 2. Geolocation Effect
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const marketsWithDistance = allMarketsData.map((market) => ({
            ...market,
            distance: calculateDistance(
              latitude,
              longitude,
              market.coords[0],
              market.coords[1],
            ),
          }));
          const closest = marketsWithDistance.sort(
            (a, b) => a.distance - b.distance,
          )[0];
          if (closest) setUserMarket(closest.title);
        },
        (error) => {
          console.error(error);
          setUserMarket("Wuse Market"); // Fallback
        },
      );
    }
  }, []);

  // 3. Logic for filtering and predicting
  const localData = JSON.parse(localStorage.getItem("naijaprice_alerts")) || [];
  const alertsData = [...alerts, ...localData];
  const nearbyAlerts = alertsData.filter(
    (alert) => alert.market === userMarket,
  );

  const totalPages = Math.max(1, Math.ceil(nearbyAlerts.length / itemsPerPage));
  if (totalPages === 0) return null;
  const safePage = currentPage >= totalPages ? 0 : currentPage;

  const startIndex = safePage * itemsPerPage;

  const visibleAlerts = nearbyAlerts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const predictionStats = nearbyAlerts.reduce(
    (acc, alert) => {
      if (alert.status === "drop" || alert.status === "best") acc.bullish++;
      if (alert.status === "rise" || alert.status === "anomally") acc.bearish++;
      return acc;
    },
    { bullish: 0, bearish: 0 },
  );

  const handleAddNewAlert = (newAlertObject) => {
    const updatedLocal = [newAlertObject, ...localData];
    localStorage.setItem("naijaprice_alerts", JSON.stringify(updatedLocal));
    setAlerts([newAlertObject, ...alerts]);
    setIsAdding(false);
  };

  return (
    <div className="flex h-screen bg-white">
      <Navigation />

      <div className="w-full flex flex-col gap-6 p-4 md:ml-64 overflow-y-auto">
        {/* Header Section */}
        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
          <div className="flex items-center gap-3">
            {showSettings && (
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <div>
              <h1 className="text-2xl font-bold">
                {showSettings ? "Settings" : "Alerts"}
              </h1>
              {!showSettings && (
                <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                  <MapPin size={14} className="text-[#00C950]" />
                  <span>
                    {userMarket ? (
                      <>
                        Markets near you: <b>{userMarket}</b>
                      </>
                    ) : (
                      "Locating..."
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* This Triggers Settings */}
          {!showSettings && !isAdding && (
            <div onClick={() => setShowSettings(true)}>
              <BtnSecondary icon={<SettingsIcon size={16} />} text="Settings" />
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {showSettings ? (
            <SettingsPage className="rounded-3xl bg-white" />
          ) : isAdding ? (
            <AddAlertForm
              onSave={handleAddNewAlert}
              onCancel={() => setIsAdding(false)}
              defaultMarket={userMarket}
            />
          ) : (
            <>
              {/* Tabs */}
              <div className="flex gap-8 border-b border-gray-100 mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm cursor-pointer font-bold capitalize transition-all ${
                      activeTab === tab
                        ? "border-b-2 border-[#00C950] text-black"
                        : "text-gray-400"
                    }`}
                  >
                    My {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === "alerts" ? (
                <div className="flex flex-col gap-6">
                  <AlertList alerts={visibleAlerts} loading={false} />
                  {user && (
                    <div onClick={() => setIsAdding(true)}>
                      <Btn btnText="+ Set New Price Alert" />
                    </div>
                  )}
                  <Pagination
                    page={safePage}
                    totalPages={totalPages}
                    onNext={() => setCurrentPage((p) => p + 1)}
                    onPrev={() => setCurrentPage((p) => p - 1)}
                    slider={true}
                  />
                </div>
              ) : (
                <div className="bg-gray-50 p-6 rounded-3xl border-2 border-dashed border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Activity size={20} className="text-[#00C950]" />
                    <h3 className="font-bold">Market Outlook: {userMarket}</h3>
                  </div>

                  <p className="text-gray-600 mb-6">
                    Based on your local alerts, the market is currently
                    <span className="font-bold text-black ml-1">
                      {predictionStats.bullish >= predictionStats.bearish
                        ? "Stable"
                        : "Rising"}
                    </span>
                    .
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-2xl shadow-sm">
                      <p className="text-xs text-gray-400 uppercase font-bold">
                        Buying Signal
                      </p>
                      <p
                        className={`text-xl font-bold ${predictionStats.bullish > predictionStats.bearish ? "text-[#00C950]" : "text-red-600"}`}
                      >
                        {predictionStats.bullish > predictionStats.bearish
                          ? "Strong"
                          : "Weak"}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm">
                      <p className="text-xs text-gray-400 uppercase font-bold">
                        Total Alerts
                      </p>
                      <p className="text-xl font-bold text-black">
                        {nearbyAlerts.length}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="text-sm font-bold text-gray-700 mb-3">
                      Local Market Breakdown
                    </h4>
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span>Positive Signals (Drops/Deals)</span>
                        <span className="font-bold text-[#00C950]">
                          {predictionStats.bullish}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Negative Signals (Rises/Anomalies)</span>
                        <span className="font-bold text-red-400">
                          {predictionStats.bearish}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Alerts;
