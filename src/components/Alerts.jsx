import AlertCard from "./AlertCard";

const alerts = [
  {
    alertDesc: "Rice (50kg) dropped to#72000atmile 12 - down8%thisweek",
    status: "drop",
    timeAgo: "2 hours ago",
  },
  {
    alertDesc: "Onions prices rose15%at Lagos markets",
    status: "rise",
    timeAgo: "5 hours ago",
  },
  {
    alertDesc:
      "Price Anomally: Palm oil reported at#500atOyingbo--SuspectedErrorFlagged by Ai",
    status: "anomally",
    timeAgo: "Yesterday",
  },
  {
    alertDesc: "Tomatoes @Epe MarketNow#38500--cheapest in your area",
    status: "best",
    timeAgo: "yesterday",
  },
  {
    alertDesc: "Garri (white) now#1800per bag atMushin Market-8%drop",
    status: "drop",
    timeAgo: "2 days ago",
  },
];

function Alerts() {
  return (
    <div className="flex flex-col gap-4">
      {alerts.map((alert, index) => (
        <AlertCard
          key={index}
          alertDesc={alert.alertDesc}
          status={alert.status}
          timeAgo={alert.timeAgo}
        />
      ))}
    </div>
  );
}

export default Alerts;
