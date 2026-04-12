import AlertCard from "./AlertCard";

function AlertList({ alerts, loading }) {
  return loading ? (
    <div className="p-10 text-center text-gray-400 animate-pulse">
      Loading alerts...
    </div>
  ) : alerts && alerts.length > 0 ? (
    <div className="flex flex-col gap-4">
      {alerts.map((alert) => (
        <AlertCard
          key={alert.id}
          alertDesc={alert.alertDesc}
          status={alert.status}
          timeAgo={alert.timeAgo}
        />
      ))}
    </div>
  ) : (
    <div className="p-10 text-center text-gray-400">
      No nearby alerts found.
    </div>
  );
}

export default AlertList;
