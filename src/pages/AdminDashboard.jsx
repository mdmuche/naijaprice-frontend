import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminReviewCard from "../components/AdminReviewCard";
import Navigation from "../components/Navigation";
import { verifyUserAsScout } from "../store/slices/userSlice"; // Make sure to export this from your slice
import { Award, Check } from "lucide-react";

function AdminDashboard() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user.usersList);
  const [activeTab, setActiveTab] = useState("markets"); // Toggle between markets and users

  // 1. Grab market suggestions from Redux
  const pendingMarkets = useSelector(
    (state) => state.suggestions.pendingMarkets,
  );

  const scoutList = allUsers.filter((u) => u.role !== "admin");
  console.log(scoutList);
  const handleVerify = (userId) => {
    dispatch(verifyUserAsScout(userId));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Navigation />

      <div className="w-full flex flex-col gap-6 p-4 mt-4 lg:mt-0 md:ml-64 overflow-y-auto">
        <div className="flex flex-col gap-2 lg:gap-0 lg:flex-row lg:justify-between lg:items-center mb-4">
          <h1 className="text-2xl font-bold">Admin Control Center</h1>

          {/* Tab Switcher */}
          <div className="flex bg-gray-200 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("markets")}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "markets" ? "bg-white shadow-sm" : "text-gray-500"}`}
            >
              Markets ({pendingMarkets.length})
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "users" ? "bg-white shadow-sm" : "text-gray-500"}`}
            >
              User Verification
            </button>
          </div>
        </div>

        {activeTab === "markets" ? (
          /* SECTION: MARKET SUGGESTIONS */
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gray-700">
              Market Suggestions
            </h2>
            {pendingMarkets.length > 0 ? (
              pendingMarkets.map((market) => (
                <AdminReviewCard key={market.id} market={market} />
              ))
            ) : (
              <div className="p-10 text-center bg-white rounded-3xl border-2 border-dashed">
                <p className="text-gray-400">
                  No new suggestions to review. ✅
                </p>
              </div>
            )}
          </div>
        ) : (
          /* SECTION: USER MANAGEMENT */
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gray-700">
              Pending Scout Verifications
            </h2>
            <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="p-4 text-sm font-bold text-gray-600">
                      User
                    </th>
                    <th className="p-4 text-sm font-bold text-gray-600">
                      Current Role
                    </th>
                    <th className="p-4 text-sm font-bold text-gray-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scoutList.map((user) => (
                    <tr key={user.id} className="border-b last:border-none">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.profilePic}
                            className="w-10 h-10 rounded-full border"
                            alt=""
                          />
                          <div>
                            <p className="font-bold text-sm">{user.name}</p>
                            <p className="text-xs text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${user.role === "scout" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4">
                        {user.isVerifiedUser ? (
                          <div className="flex items-center gap-1 text-[#00C950] font-bold text-xs">
                            <Award className="w-4 h-4" />{" "}
                            <div className="hidden sm:block">Verified</div>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleVerify(user.id)}
                            className="bg-black text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors"
                          >
                            Verify as Scout
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
