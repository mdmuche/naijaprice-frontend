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
  const { userLocation } = useSelector((state) => state.markets);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.formName || !formData.formArea) {
      alert("Please fill all fields");
      return;
    }

    dispatch(
      addMarketSuggestion({
        id: `suggested-${Date.now()}`,
        title: formData.formName,
        location: formData.formArea,
        coords: userLocation ? [userLocation.lat, userLocation.lng] : [0, 0],
        status: "pending",
        createdAt: new Date().toISOString(),
      }),
    );

    alert("Thank you! Market suggested for verification.");
    navigate("/markets");
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
