import { SlidersHorizontal } from "lucide-react";

function Filter({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 rounded-lg bg-white text-black font-normal px-4 py-2 cursor-pointer hover:border-[#00C950] transition-all"
    >
      <SlidersHorizontal size={18} />
      <span className="hidden sm:block">Filter</span>
    </div>
  );
}
export default Filter;
