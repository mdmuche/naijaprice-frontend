import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ page, totalPages, onNext, onPrev, slider }) {
  if (totalPages <= 1) return null;

  return (
    <div
      className={`${slider ? "mx-auto" : "rounded-xl border border-gray-200"} w-fit flex items-center gap-3 bg-white p-1`}
    >
      <button
        disabled={page === 0}
        onClick={onPrev}
        className={`p-2 rounded-lg ${
          page === 0 ? "text-gray-300" : "text-[#00C950] cursor-pointer"
        }`}
      >
        <ChevronLeft size={20} />
      </button>

      <span className="text-xs font-bold text-gray-600">
        Page {page + 1} of {totalPages}
      </span>

      <button
        disabled={page + 1 >= totalPages}
        onClick={onNext}
        className={`p-2 rounded-lg ${
          page + 1 >= totalPages
            ? "text-gray-300"
            : "text-[#00C950] cursor-pointer"
        }`}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

export default Pagination;
