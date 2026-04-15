import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormField from "../components/forms/FormField";
import AppShell from "../components/layout/AppShell";
import Button from "../components/ui/Button";
import { addMarketSuggestion } from "../store/slices/suggestionSlice";

function SuggestMarket() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLocation, allMarkets } = useSelector((state) => state.markets);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers

    // Convert degrees to radians
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    // Return formatted string for UI (e.g., "5.4")
    return distance.toFixed(1);
  };
  const [formData, setFormData] = useState({
    formName: "",
    formArea: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.formName || !formData.formArea) {
      alert("Please fill all fields");
      return;
    }

    // 1. Get User's Current Location (No hardcoding)
    const getUserLocation = () => {
      return new Promise((resolve, reject) => {
        if (userLocation?.lat) {
          resolve([userLocation.lat, userLocation.lng]);
        } else if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (pos) => resolve([pos.coords.latitude, pos.coords.longitude]),
            () => reject("Please enable location to suggest a market."),
          );
        } else {
          reject("Location services not supported.");
        }
      });
    };
    try {
      const userCoords = await getUserLocation();

      // 2. Duplicate Check
      const marketExists = allMarkets.find(
        (s) =>
          s.title.toLowerCase().trim() ===
          formData.formName.toLowerCase().trim(),
      );

      if (marketExists) {
        return alert("This market has already been suggested!");
      }

      // 3. Set Market Coordinates (Using User location as anchor)
      const marketLat = userCoords[0] + (Math.random() - 0.5) * 0.005;
      const marketLng = userCoords[1] + (Math.random() - 0.5) * 0.005;

      // 4. Calculate Distance
      const distValue = calculateDistance(
        userCoords[0],
        userCoords[1],
        marketLat,
        marketLng,
      );

      // 5. Construct Metrics-Compliant Object
      const suggestionData = {
        id: Date.now(),
        title: formData.formName,
        location: formData.formArea,
        coords: [marketLat, marketLng],
        distance: `${distValue} km away`,
        rawDist: parseFloat(distValue),
        reports: 0,
        status: "pending", // Will be "active" once verified by admin
        lastUpdated: "Just now",
        createdAt: new Date().toISOString(),
      };

      dispatch(addMarketSuggestion(suggestionData));

      alert("Success! Market suggested for verification.");
      navigate("/markets");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <AppShell contentClassName="flex flex-col gap-6 p-4 md:p-6">
      <section className="max-w-2xl space-y-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">
            Suggest a New Market
          </h1>
          <p className="text-sm text-gray-500">
            Share a market in your area so the community can review and verify
            it.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            name="formName"
            type="text"
            label="Market Name"
            value={formData.formName}
            placeholder="e.g. Ketu Fruit Market"
            onChange={handleChange}
          />

          <FormField
            name="formArea"
            type="text"
            label="Market Location"
            value={formData.formArea}
            placeholder="e.g. Ketu, Lagos"
            onChange={handleChange}
          />

          <Button type="submit" className="w-full sm:w-auto">
            Submit Suggestion
          </Button>
        </form>
      </section>
    </AppShell>
  );
}

export default SuggestMarket;
