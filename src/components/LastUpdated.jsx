import { useEffect, useState } from "react";
import { timeAgo as formatTimeAgo } from "../utils/timeAgo";

export const LastUpdated = ({ timestamp }) => {
  const [timeAgo, setTimeAgo] = useState(() => formatTimeAgo(timestamp));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(formatTimeAgo(timestamp));
    }, 60000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return <span className="text-gray-500">Last updated: {timeAgo}</span>;
};
