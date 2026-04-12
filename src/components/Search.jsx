import { ChevronDown, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../store/slices/marketSlice";
import { setSearchTerm } from "../store/slices/priceSlice";

function SearchContainer({ placeholder, angle, page = "prices" }) {
  const dispatch = useDispatch();

  const searchTerm = useSelector((state) =>
    page === "markets" ? state.markets.searchQuery : state.prices.searchTerm,
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (page === "markets") {
      dispatch(setSearchQuery(value));
    } else {
      dispatch(setSearchTerm(value));
    }
  };

  return (
    <div className={`relative ${angle ? "w-full" : "w-full sm:w-[280px]"}`}>
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        size={18}
      />

      <input
        type="text"
        value={searchTerm}
        placeholder={placeholder}
        onChange={handleSearchChange}
        className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-[#00C950] focus:ring-4 focus:ring-[#00C950]/10"
      />

      {angle && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
          <ChevronDown />
        </div>
      )}
    </div>
  );
}

export default SearchContainer;
