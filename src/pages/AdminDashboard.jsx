import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminReviewCard from "../components/AdminReviewCard";
import Navigation from "../components/Navigation";
import { verifyUserAsScout } from "../store/slices/userSlice";
import {
  verifyPriceReport,
  rejectPriceReport,
} from "../store/slices/priceSlice";
import { Award, Check, X } from "lucide-react";
import Pagination from "../components/Pagination";

function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user.usersList);
  const commodities = useSelector((state) => state.prices.commodities);
  const [activeTab, setActiveTab] = useState("markets"); // Toggle between markets and users

  const itemsPerPage = 8;

  // 1. Grab market suggestions from Redux
  const pendingMarkets = useSelector(
    (state) => state.suggestions.pendingMarkets,
  );

  //  Logic for Users
  const scoutList = allUsers.filter((u) => u.role !== "admin");

  // Logic for Price Reports (Filter pending ones)
  const pendingReports = commodities.filter((c) => c.status === "pending");

  const handleVerify = (userId) => {
    dispatch(verifyUserAsScout(userId));
  };

  // Determine which list to paginate based on active tab
  const activeList = activeTab === "users" ? scoutList : pendingReports;
  const totalPages = Math.ceil(activeList.length / itemsPerPage);
  const safePage = currentPage >= totalPages ? 0 : currentPage;
  const startIndex = safePage * itemsPerPage;
  const visibleItems = activeList.slice(startIndex, startIndex + itemsPerPage);

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
              onClick={() => {
                setActiveTab("reports");
                setCurrentPage(0);
              }}
              className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${activeTab === "reports" ? "bg-white shadow-sm" : "text-gray-500"}`}
            >
              Price Reports ({pendingReports.length})
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "users" ? "bg-white shadow-sm" : "text-gray-500"}`}
            >
              User
            </button>
          </div>
        </div>
        {activeTab === "markets" && (
          /* SECTION: MARKET SUGGESTIONS */
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gray-700">
              Market Suggestions
            </h2>
            {pendingMarkets.length > 0 ? (
              <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x">
                {pendingMarkets.map((market) => (
                  <div
                    key={market.id}
                    className="min-w-[300px] md:min-w-[400px] snap-start"
                  >
                    <AdminReviewCard market={market} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 text-center bg-white rounded-3xl border-2 border-dashed">
                <p className="text-gray-400">
                  No new suggestions to review. ✅
                </p>
              </div>
            )}
          </div>
        )}

        {/* --- SECTION: PRICE REPORTS --- */}
        {activeTab === "reports" && (
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gray-700">
              Pending Price Verification
            </h2>
            <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="p-4 text-sm font-bold text-gray-600">
                      Item
                    </th>
                    <th className="p-4 text-sm font-bold text-gray-600">
                      Market
                    </th>
                    <th className="p-4 text-sm font-bold text-gray-600">
                      Price
                    </th>
                    <th className="p-4 text-sm font-bold text-gray-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visibleItems.length > 0 ? (
                    visibleItems.map((report) => (
                      <tr
                        key={report.id}
                        className="border-b last:border-none hover:bg-gray-50"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={report.image}
                              className="w-10 h-10 rounded-lg object-cover border"
                              alt=""
                            />
                            <div>
                              <p className="font-bold text-sm">
                                {report.title}
                              </p>
                              <p className="text-xs text-gray-500">
                                {report.snippet}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          {report.market}
                        </td>
                        <td className="p-4 font-bold text-[#00C950]">
                          ₦{report.price.toLocaleString()}
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                dispatch(verifyPriceReport(report.id))
                              }
                              className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                              title="Verify"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() =>
                                dispatch(rejectPriceReport(report.id))
                              }
                              className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                              title="Reject"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="p-10 text-center text-gray-400"
                      >
                        No price reports to verify.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <Pagination
                page={safePage}
                totalPages={totalPages}
                onPrev={() => setCurrentPage((prev) => prev - 1)}
                onNext={() => setCurrentPage((prev) => prev + 1)}
                slider={true}
              />
            </div>
          </div>
        )}

        {/* SECTION: USER MANAGEMENT */}
        {activeTab === "users" && (
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
                  {visibleItems.map((user) => (
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
              <Pagination
                page={safePage}
                totalPages={totalPages}
                onPrev={() => setCurrentPage((prev) => prev - 1)}
                onNext={() => setCurrentPage((prev) => prev + 1)}
                slider={false}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
