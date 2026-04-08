import AlertCard from "./AlertCard";

function AlertList({ alerts }) {
  if (alerts.length === 0) {
    return (
      <div className="p-10 text-center text-gray-400">
        No nearby alerts found.
      </div>
    );
  }

  return (
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
  );
}

export default AlertList;
