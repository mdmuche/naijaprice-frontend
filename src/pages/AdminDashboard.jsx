import { useSelector } from "react-redux";
import AdminReviewCard from "../components/AdminReviewCard";
import Navigation from "../components/Navigation";

function AdminDashboard() {
  // Grab the list of suggestions from Redux
  const pendingMarkets = useSelector(
    (state) => state.suggestions.pendingMarkets,
  );

  return (
    <div className="flex h-screen">
      <Navigation />
      <div className="w-full flex flex-col gap-4 p-4 mt-4 lg:mt-0 md:ml-64">
        <h1 className="text-2xl font-bold mb-6">Market Suggestions Review</h1>

        <div className="flex flex-col gap-4">
          {pendingMarkets.length > 0 ? (
            pendingMarkets.map((market) => (
              <AdminReviewCard key={market.id} market={market} />
            ))
          ) : (
            <div className="p-10 text-center bg-white rounded-2xl border-2 border-dashed">
              <p className="text-gray-400">
                No new suggestions to review. All caught up! ✅
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
