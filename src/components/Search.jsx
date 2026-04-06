import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../store/slices/priceSlice";
import { setSearchQuery } from "../store/slices/marketSlice"; // 1. Add market action
import { ChevronDown, Search } from "lucide-react";

function SearchContainer({ placeholder, angle, page = "prices" }) {
  // 2. Added default 'page' prop
  const dispatch = useDispatch();

  // 3. Conditionally grab the correct search term from Redux
  const searchTerm = useSelector((state) =>
    page === "markets" ? state.markets.searchQuery : state.prices.searchTerm,
  );

  // 4. Determine which action to dispatch based on the current page
  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (page === "markets") {
      dispatch(setSearchQuery(value));
    } else {
      dispatch(setSearchTerm(value));
    }
  };

  return (
    <div className={`relative p-2 ${angle ? "w-full" : "w-fit"}`}>
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        size={18}
      />

      <input
        type="text"
        value={searchTerm} // Controlled component bound to correct state
        placeholder={placeholder}
        onChange={handleSearchChange} // Triggers appropriate search
        className="w-full pl-10 pr-4 py-2 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#00C950]"
      />

      {angle && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          <ChevronDown />
        </div>
      )}
    </div>
  );
}

export default SearchContainer;
