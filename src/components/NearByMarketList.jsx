import { useSelector } from "react-redux";
import NearbyMarketCard from "./NearbyMarketCard";
import Btn from "./Btn";

function NearByMarketList() {
  const { filteredMarkets, userLocation } = useSelector(
    (state) => state.markets,
  );

  if (!userLocation) {
    return (
      <div className="p-10 text-center animate-pulse">
        Detecting your location...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {filteredMarkets.length > 0 ? (
        filteredMarkets.map((market) => (
          <NearbyMarketCard key={market.id} {...market} />
        ))
      ) : (
        <p className="text-center text-gray-500 py-10">
          No markets match your search.
        </p>
      )}
      <Btn btnText={"+ Suggest a Market"} />
    </div>
  );
}

export default NearByMarketList;
