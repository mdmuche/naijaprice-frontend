import { SlidersHorizontal } from "lucide-react";

function Filter() {
  return (
    <div className="flex items-center gap-4 rounded-lg bg-white text-black font-normal px-4 py-2 cursor-pointer">
      <SlidersHorizontal size={18} />
      <span className="hidden sm:block">Filter</span>
    </div>
  );
}

export default Filter;
