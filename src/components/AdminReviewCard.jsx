import { useDispatch } from "react-redux";
import { approveNewMarket } from "../store/slices/marketSlice";
import { removeSuggestion } from "../store/slices/suggestionSlice";
import { Trash2 } from "lucide-react";

function AdminReviewCard({ market }) {
  const dispatch = useDispatch();

  const handleApprove = () => {
    // 1. Add to the main "Verified" list
    dispatch(approveNewMarket(market));

    // 2. Remove from the "Pending" list
    dispatch(removeSuggestion(market.id));

    alert(`${market.title} is now a verified market!`);
  };

  const handleReject = () => {
    // We only need to remove it from the suggestions list
    if (window.confirm(`Are you sure you want to reject "${market.title}"?`)) {
      dispatch(removeSuggestion(market.id));
    }
  };

  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm flex justify-between items-center">
      <div>
        <h3 className="font-bold">{market.title}</h3>
        <p className="text-sm text-gray-500">{market.location}</p>
      </div>
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button
          onClick={handleReject}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-red-500 font-semibold border border-red-100 rounded-xl hover:bg-red-50 transition-colors"
        >
          <Trash2 size={16} />
          Reject
        </button>

        <button
          onClick={handleApprove}
          className="bg-[#00C950] text-white px-6 py-2 rounded-lg font-bold hover:bg-green-600 transition-colors"
        >
          Approve
        </button>
      </div>
    </div>
  );
}

export default AdminReviewCard;
