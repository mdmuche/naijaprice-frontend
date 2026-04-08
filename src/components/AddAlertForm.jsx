import { useState } from "react";
import { X } from "lucide-react";

function AddAlertForm({ onSave, onCancel, defaultMarket }) {
  const [formData, setFormData] = useState({
    item: "",
    price: "",
    status: "drop",
    market: defaultMarket || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Construct the final alert object
    const finalAlert = {
      id: Date.now(),
      market: formData.market,
      alertDesc: `${formData.item} price is ₦${Number(formData.price).toLocaleString()} at ${formData.market}`,
      status: formData.status,
      timeAgo: "Just now",
    };
    onSave(finalAlert);
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Create Price Alert</h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-gray-700">Commodity</label>
          <input
            type="text"
            required
            placeholder="e.g. Tomatoes (Big Basket)"
            className="p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00C950] outline-none"
            onChange={(e) => setFormData({ ...formData, item: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">
              Market Price (₦)
            </label>
            <input
              type="number"
              required
              placeholder="45000"
              className="p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00C950] outline-none"
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">Trend</label>
            <select
              className="p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none appearance-none cursor-pointer"
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="drop">Price Drop</option>
              <option value="rise">Price Rise</option>
              <option value="best">Best Deal</option>
              <option value="anomally">Anomaly</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-gray-700">Market Name</label>
          <input
            type="text"
            value={formData.market}
            className="p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
            onChange={(e) =>
              setFormData({ ...formData, market: e.target.value })
            }
          />
        </div>

        <div className="flex gap-4 mt-2">
          <button
            type="submit"
            className="flex-1 bg-[#00C950] text-white py-4 rounded-2xl font-bold hover:shadow-lg transition-all"
          >
            Broadcast Alert
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddAlertForm;
