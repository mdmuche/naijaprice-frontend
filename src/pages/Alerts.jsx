import { useState, useEffect } from "react";
import {
  Settings as SettingsIcon,
  MapPin,
  Activity,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import AlertList from "../components/Alerts";
import AddAlertForm from "../components/AddAlertForm";
import SettingsPage from "../components/Settings";
import Btn from "../components/Btn";
import BtnSecondary from "../components/BtnSecondary";
import AppShell from "../components/layout/AppShell";
import { INITIAL_ALERTS } from "../utils/alertsData";
import { useSelector } from "react-redux";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 5;
const FALLBACK_MARKET = "Wuse Market";
const STORAGE_KEY = "naijaprice_alerts";

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const earthRadiusKm = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
};

const getLocalAlerts = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function PageHeader({ showSettings, userMarket, onBack, onOpenSettings }) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-start gap-3">
        {showSettings && (
          <button
            onClick={onBack}
            className="rounded-full p-2 transition-colors hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
        )}

        <div className="space-y-1">
          <h1 className="text-2xl font-bold">
            {showSettings ? "Settings" : "Alerts"}
          </h1>

          {!showSettings && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
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

      {!showSettings && (
        <div onClick={onOpenSettings}>
          <BtnSecondary icon={<SettingsIcon size={16} />} text="Settings" />
        </div>
      )}
    </div>
  );
}

function AlertsTabs({ tabs, activeTab, onChange }) {
  return (
    <div className="mb-6 flex gap-8 border-b border-gray-100">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`cursor-pointer border-b-2 pb-3 text-sm font-bold capitalize transition-colors ${
            activeTab === tab
              ? "border-[#00C950] text-black"
              : "border-transparent text-gray-400"
          }`}
        >
          My {tab}
        </button>
      ))}
    </div>
  );
}

function PredictionsPanel({ userMarket, predictionStats, nearbyAlertsCount }) {
  const marketOutlook =
    predictionStats.bullish >= predictionStats.bearish ? "Stable" : "Rising";
  const buyingSignal =
    predictionStats.bullish > predictionStats.bearish ? "Strong" : "Weak";
  const buyingSignalColor =
    predictionStats.bullish > predictionStats.bearish
      ? "text-[#00C950]"
      : "text-red-600";

  return (
    <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50 p-6">
      <div className="mb-4 flex items-center gap-2">
        <Activity size={20} className="text-[#00C950]" />
        <h3 className="font-bold">Market Outlook: {userMarket}</h3>
      </div>

      <p className="mb-6 text-gray-600">
        Based on your local alerts, the market is currently
        <span className="ml-1 font-bold text-black">{marketOutlook}</span>.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-xs font-bold uppercase text-gray-400">
            Buying Signal
          </p>
          <p className={`text-xl font-bold ${buyingSignalColor}`}>
            {buyingSignal}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-xs font-bold uppercase text-gray-400">
            Total Alerts
          </p>
          <p className="text-xl font-bold text-black">{nearbyAlertsCount}</p>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="mb-3 text-sm font-bold text-gray-700">
          Local Market Breakdown
        </h4>

        <div className="space-y-2 text-sm">
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
  );
}

function Alerts() {
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [isAdding, setIsAdding] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState("alerts");
  const [userMarket, setUserMarket] = useState(null);
  const [isChanging, setIsChanging] = useState(false);
  const user = useSelector((state) => state.user.profile);
  const { allMarkets } = useSelector((state) => state.markets);
  const [currentPage, setCurrentPage] = useState(0);
  const tabs = user ? ["alerts", "predictions"] : ["alerts"];

  const handleMarketChange = (marketTitle) => {
    setUserMarket(marketTitle);
    setIsChanging(false);
    setCurrentPage(0); // Reset pagination when market changes
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const marketsWithDistance = allMarkets.map((market) => ({
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
          setUserMarket(FALLBACK_MARKET);
        },
      );
    }
  }, [allMarkets]);

  const localAlerts = getLocalAlerts();
  const alertItems = [...alerts, ...localAlerts];
  const nearbyAlerts = alertItems.filter(
    (alert) => alert.market === userMarket,
  );
  const totalPages = Math.max(
    1,
    Math.ceil(nearbyAlerts.length / ITEMS_PER_PAGE),
  );
  const safePage = currentPage >= totalPages ? 0 : currentPage;
  const startIndex = safePage * ITEMS_PER_PAGE;
  const visibleAlerts = nearbyAlerts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
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
    const updatedLocal = [newAlertObject, ...localAlerts];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLocal));
    setAlerts([newAlertObject, ...alerts]);
    setIsAdding(false);
  };

  return (
    <AppShell
      className="bg-white"
      contentClassName="flex flex-col gap-6 p-4 md:p-6"
      withMobileOffset={false}
    >
      <PageHeader
        showSettings={showSettings}
        userMarket={userMarket}
        onBack={() => setShowSettings(false)}
        onOpenSettings={() => setShowSettings(true)}
      />

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
            <button
              onClick={() => setIsChanging(!isChanging)}
              className="w-fit text-[#00C950] font-semibold text-sm hover:underline px-4 py-2 rounded-lg bg-white border border-[#00C950]/20 transition-all mb-2"
            >
              {isChanging ? "Cancel" : "Change Market"}
            </button>

            {/* MARKET SELECTOR OVERLAY */}
            {isChanging && (
              <div className="w-full mb-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-100 p-2">
                <div className="p-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Nearby Markets
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {allMarkets.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => handleMarketChange(m.title)} // UPDATED THIS
                      className="flex items-center justify-between p-3 hover:bg-[#00C950]/5 rounded-lg cursor-pointer group"
                    >
                      <div>
                        <p className="font-bold text-gray-700 group-hover:text-[#00C950]">
                          {m.title}
                        </p>
                        <p className="text-xs text-gray-400">{m.location}</p>
                      </div>
                      <ChevronRight size={16} className="text-gray-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <AlertsTabs
              tabs={tabs}
              activeTab={activeTab}
              onChange={setActiveTab}
            />

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
              <PredictionsPanel
                userMarket={userMarket}
                predictionStats={predictionStats}
                nearbyAlertsCount={nearbyAlerts.length}
              />
            )}
          </>
        )}
      </div>
    </AppShell>
  );
}

export default Alerts;
