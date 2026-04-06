import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterStatus } from "../store/slices/marketSlice";
import { SlidersHorizontal } from "lucide-react";

function FilterMarket() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const currentStatus = useSelector((state) => state.markets.filterStatus);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <SlidersHorizontal size={20} />
      </button>

      {/* FILTER MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Filters</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-black transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-gray-400 mb-3 tracking-widest">
                  MARKET STATUS
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {["all", "active", "quiet"].map((status) => (
                    <button
                      key={status}
                      onClick={() => dispatch(setFilterStatus(status))}
                      className={`py-2 rounded-xl text-xs font-bold capitalize border-2 transition-all ${
                        currentStatus === status
                          ? "bg-[#00C950] text-white border-[#00C950] shadow-lg shadow-green-100"
                          : "bg-white text-gray-500 border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                onClick={() => {
                  dispatch(setFilterStatus("all"));
                  setIsOpen(false);
                }}
              >
                Reset
              </button>
              <button
                className="flex-1 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all active:scale-95"
                onClick={() => setIsOpen(false)}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FilterMarket;
