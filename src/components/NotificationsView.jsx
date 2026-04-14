import { useState } from "react";
import Toggle from "./ui/Toggle";

function NotificationsView() {
  const [prefs, setPrefs] = useState({
    priceAlerts: true,
    marketReports: false,
    weeklyDigest: true,
  });

  const handleToggle = (key) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="divide-y divide-gray-50">
      <Toggle
        active={prefs.priceAlerts}
        label="Price Thresholds"
        desc="Notify me when a commodity drops by 10%+"
        onToggle={() => handleToggle("priceAlerts")}
      />
      <Toggle
        active={prefs.marketReports}
        label="New Reports"
        desc="Daily summary of your preferred markets"
        onToggle={() => handleToggle("marketReports")}
      />
      <Toggle
        active={prefs.weeklyDigest}
        label="Weekly Insights"
        desc="Trends and forecast reports"
        onToggle={() => handleToggle("weeklyDigest")}
      />
    </div>
  );
}

export default NotificationsView;
