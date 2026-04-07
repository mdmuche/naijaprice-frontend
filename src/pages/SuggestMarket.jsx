import { useDispatch, useSelector } from "react-redux";
import { addMarketSuggestion } from "../store/slices/suggestionSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

function SuggestMarket() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Grab location from Redux
  const { userLocation } = useSelector((state) => state.markets);

  const [formData, setFormData] = useState({
    formName: "",
    formArea: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // We use the 'name' attribute of the input to update the correct key
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.formName || !formData.formArea)
      return alert("Please fill all fields");

    const newMarketSuggestion = {
      id: `suggested-${Date.now()}`,
      title: formData.formName,
      location: formData.formArea,
      // Fallback to [0,0] if GPS hasn't loaded yet to prevent errors
      coords: userLocation ? [userLocation.lat, userLocation.lng] : [0, 0],
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    dispatch(addMarketSuggestion(newMarketSuggestion));
    alert("Thank you! Market suggested for verification.");
    navigate("/markets");
  };

  return (
    <div className="flex h-screen">
      <Navigation />
      <div className="w-full flex flex-col gap-4 p-4 lg:mt-0 md:ml-64">
        <h2 className="text-xl font-bold mb-4">Suggest a New Market</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Market Name
            </label>
            <input
              name="formName" // Matches the key in formData
              onChange={handleChange}
              type="text"
              placeholder="e.g. Ketu Fruit Market"
              className="w-full p-3 border rounded-xl outline-[#00C950]"
              value={formData.formName}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">
              Market Location
            </label>
            <input
              name="formArea" // Matches the key in formData
              onChange={handleChange}
              type="text"
              placeholder="e.g. Ketu, Lagos"
              className="w-full p-3 border rounded-xl outline-[#00C950]"
              value={formData.formArea}
            />
          </div>

          <button
            type="submit"
            className="bg-[#00C950] text-white py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-all"
          >
            Submit Suggestion
          </button>
        </form>
      </div>
    </div>
  );
}

export default SuggestMarket;
