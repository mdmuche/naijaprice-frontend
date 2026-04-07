import { useSelector } from "react-redux";
import { MapPin, Clock, CheckCircle } from "lucide-react";

function SuggestedMarketList() {
  // Grab the array from your suggestion slice
  const pendingMarkets = useSelector(
    (state) => state.suggestions.pendingMarkets,
  );

  if (pendingMarkets.length === 0) {
    return (
      <div className="p-10 text-center text-gray-400 border-2 border-dashed rounded-2xl">
        No pending market suggestions yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-bold text-gray-800">Pending Verification</h2>

      {pendingMarkets.map((market) => (
        <div
          key={market.id}
          className="bg-white border border-amber-100 rounded-2xl p-4 shadow-sm relative overflow-hidden"
        >
          {/* Status Badge */}
          <div className="absolute top-0 right-0 bg-amber-50 text-amber-600 px-3 py-1 rounded-bl-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
            <Clock size={12} /> {market.status}
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-50 rounded-full text-amber-500">
              <MapPin size={20} />
            </div>

            <div>
              <h3 className="font-bold text-gray-900 capitalize">
                {market.title}
              </h3>
              <p className="text-sm text-gray-500 capitalize">
                {market.location}
              </p>
              <div className="mt-2 flex items-center gap-2 text-[10px] text-gray-400">
                <span>
                  Coords: {market.coords[0]?.toFixed(4)},{" "}
                  {market.coords[1]?.toFixed(4)}
                </span>
                <span>•</span>
                <span>{new Date(market.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SuggestedMarketList;
