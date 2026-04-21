import { AnimatePresence, motion } from "framer-motion";
import AlertCard from "./AlertCard";
import EmptyState from "./ui/EmptyState";
import Skeleton from "./ui/Skeleton";

function AlertList({ alerts, loading }) {
  const MotionItem = motion.div;

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="mt-4 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-5/6" />
            <Skeleton className="mt-6 h-10 w-32" />
          </div>
        ))}
      </div>
    );
  }

  if (!alerts || alerts.length === 0) {
    return (
      <EmptyState
        title="No nearby alerts yet"
        description="When price movement is detected around your market, your alerts will appear here."
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence initial={false}>
        {alerts.map((alert, index) => (
          <MotionItem
            key={alert.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: index * 0.04, duration: 0.22 }}
          >
            <AlertCard
              alertDesc={alert.alertDesc}
              status={alert.status}
              timeAgo={alert.timeAgo}
              id={alert.id}
              market={alert.market}
              price={alert.price}
              title={alert.alertDesc}
            />
          </MotionItem>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default AlertList;
