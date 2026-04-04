import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../store/slices/priceSlice"; // Adjust path if needed
import { ChevronDown, Search } from "lucide-react";

function SearchContainer({ placeholder, angle }) {
  const dispatch = useDispatch();

  // Link the input value to the global Redux state
  const searchTerm = useSelector((state) => state.prices.searchTerm);

  return (
    <div className={`relative p-2 ${angle ? "w-full" : "w-fit"}`}>
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        size={18}
      />

      <input
        type="text"
        value={searchTerm} // Controlled component
        placeholder={placeholder}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))} // Update Redux on every keystroke
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
