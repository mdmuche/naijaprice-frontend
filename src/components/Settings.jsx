import {
  Bell,
  CircleAlert,
  Globe,
  HardDrive,
  LogOut,
  MapPin,
  UserPen,
} from "lucide-react";
import SettingListItem from "./SettingListItem";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/slices/userSlice";
import { togglePreferredMarket } from "../store/slices/userSlice";
import { useState } from "react";
import EditProfile from "./EditProfile";
import NotificationsView from "./NotificationsView";
import OfflineDataView from "./OfflineData";
import AboutView from "./AboutView";
import LanguagesView from "./LanguagesView";
import Pagination from "./Pagination";

function Settings({ className }) {
  const [showMarketSelector, setShowMarketSelector] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const { allMarkets } = useSelector((state) => state.markets);
  const [activeTab, setActiveTab] = useState("profile");
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const itemsPerPage = 5;

  const { profile } = useSelector((state) => state.user);
  // Get preferred IDs from profile (default to empty array)
  const preferredIds = profile?.preferredMarkets || [];
  const handleToggle = (id) => {
    dispatch(togglePreferredMarket(id));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("naijaprice_user");
    localStorage.removeItem("naijaprice_user_token");
    navigate("/login");
  };

  const settingsList = [
    {
      id: 1,
      title: "Edit Profile",
      icon: <UserPen size={16} />,
    },
    {
      id: 2,
      title: "Preferred Markets",
      icon: <MapPin size={16} />,
    },
    {
      id: 3,
      title: "Notifications Settings",
      icon: <Bell size={16} />,
    },
    {
      id: 4,
      title: "Offline Data",
      icon: <HardDrive size={16} />,
    },
    {
      id: 5,
      title: "Language",
      icon: <Globe size={16} />,
    },
    {
      id: 6,
      title: "About NaijaPrice",
      icon: <CircleAlert size={16} />,
    },
  ];

  const totalPages = Math.ceil(allMarkets.length / itemsPerPage);
  const safePage = currentPage >= totalPages ? 0 : currentPage;
  const startIndex = safePage * itemsPerPage;
  const visibleItems = allMarkets.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div
      className={`${className} flex flex-col p-2 gap-10 border-2 border-gray-200 sm:p-4`}
    >
      <h3>Settings</h3>
      {settingsList.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            if (item.id === 2) {
              setShowMarketSelector(true);
            } else {
              // Map the IDs to your tab strings
              const tabMap = {
                1: "profile",
                3: "notifications",
                4: "offline",
                5: "language",
                6: "about",
              };

              // Set the active tab based on what was clicked
              setActiveTab(tabMap[item.id]);
              // Open the Multi-Tab Modal
              setShowSettingsModal(true);
            }
          }}
          className="cursor-pointer"
        >
          <SettingListItem {...item} />
        </div>
      ))}

      {/* THE MULTI-TAB MODAL */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-xl rounded-t-3xl sm:rounded-3xl flex flex-col max-h-[90vh] shadow-2xl overflow-hidden">
            {/* Modal Header & Tab Navigation */}
            <div className="p-6 border-b border-gray-100 dark:border-zinc-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-xl capitalize">
                  {activeTab.replace("-", " ")}
                </h2>
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="text-gray-400 p-2 hover:bg-gray-100 rounded-full"
                >
                  x
                </button>
              </div>

              <div className="flex gap-6 overflow-x-auto no-scrollbar">
                {["profile", "notifications", "offline", "about"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 text-sm font-bold capitalize transition-all whitespace-nowrap ${
                      activeTab === tab
                        ? "text-[#00C950] border-b-2 border-[#00C950]"
                        : "text-gray-400"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="p-6 overflow-y-auto">
              {activeTab === "profile" && <EditProfile profile={profile} />}
              {activeTab === "notifications" && <NotificationsView />}
              {activeTab === "offline" && <OfflineDataView />}
              {activeTab === "about" && <AboutView />}
              {/* Add this line */}
              {activeTab === "language" && <LanguagesView />}
            </div>
          </div>
        </div>
      )}

      {/* PREFERRED MARKETS OVERLAY / MODAL */}
      {showMarketSelector && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg">Select Preferred Markets</h2>
              <button
                onClick={() => setShowMarketSelector(false)}
                className="text-gray-500"
              >
                Close
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {visibleItems.map((market) => (
                <div
                  key={market.id}
                  onClick={() => handleToggle(market.id)}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    preferredIds.includes(market.id)
                      ? "border-[#00C950] bg-[#00C950]/5"
                      : "border-gray-50 hover:border-gray-200"
                  }`}
                >
                  <div>
                    <p className="font-bold text-sm">{market.title}</p>
                    <p className="text-xs text-gray-500">{market.location}</p>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      preferredIds.includes(market.id)
                        ? "bg-[#00C950] border-[#00C950]"
                        : "border-gray-200"
                    }`}
                  >
                    {preferredIds.includes(market.id) && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                </div>
              ))}
              <Pagination
                page={safePage}
                totalPages={totalPages}
                onPrev={() => setCurrentPage((prev) => prev - 1)}
                onNext={() => setCurrentPage((prev) => prev + 1)}
                slider={true}
              />
            </div>
          </div>
        </div>
      )}
      <div
        onClick={handleLogout}
        className="flex items-center gap-2 text-red-500 mt-4 cursor-pointer"
      >
        <div className="bg-[#FF0000]/10 p-2 rounded-lg w-fit cursor-pointer">
          <LogOut size={16} />
        </div>

        <button>Log Out</button>
      </div>
    </div>
  );
}

export default Settings;
