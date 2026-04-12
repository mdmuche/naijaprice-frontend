import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import NearbyMarketCard from "./NearbyMarketCard";
import Btn from "./Btn";
import Pagination from "./Pagination";
import { useState } from "react";

function NearByMarketList() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 5;
  const { filteredMarkets, userLocation } = useSelector(
    (state) => state.markets,
  );

  // useEffect(() => {
  //   setCurrentPage(0);
  // }, [searchQuery]);

  if (!userLocation) {
    return (
      <div className="p-10 text-center animate-pulse text-gray-400 font-medium">
        Detecting your location...
      </div>
    );
  } // Pagination logic
  const totalPages = Math.ceil(filteredMarkets.length / itemsPerPage);

  const safePage = currentPage >= totalPages ? 0 : currentPage;

  const startIndex = safePage * itemsPerPage;

  const visibleMarkets = filteredMarkets.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="flex flex-col gap-4">
      {/* 1. The Market List */}
      <div className="flex flex-col gap-3">
        {visibleMarkets.length > 0 ? (
          visibleMarkets.map((market) => (
            <NearbyMarketCard key={market.id} {...market} />
          ))
        ) : (
          <div className="py-12 px-6 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 font-medium">
              No verified markets nearby.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Try adjusting your search or add one below.
            </p>
          </div>
        )}
      </div>

      {/* 2. The Suggestion Action */}
      <div
        className="mt-2 cursor-pointer"
        onClick={() => navigate("/suggest-market")}
      >
        <Link to={"/suggest-market"}>
          <Btn btnText={"+ Suggest a Market"} />
        </Link>
      </div>
      {totalPages > 1 && (
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPrev={() => setCurrentPage((p) => p - 1)}
          onNext={() => setCurrentPage((p) => p + 1)}
          slider={true}
        />
      )}
    </div>
  );
}

export default NearByMarketList;
