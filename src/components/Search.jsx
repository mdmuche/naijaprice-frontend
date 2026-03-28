import { Search } from "lucide-react";

function SearchContainer({ placeholder }) {
  return (
    <div className="relative p-2">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        size={18}
      />

      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#00C950]"
      />
    </div>
  );
}

export default SearchContainer;
