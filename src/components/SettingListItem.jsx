import { ChevronRight } from "lucide-react";

function SettingListItem({ title, icon }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        {title}
      </div>
      <div>
        {title.toLowerCase() === "language" ? (
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-[12px] font-light">
              English
            </span>
            <ChevronRight className="text-gray-500 cursor-pointer" size={16} />
          </div>
        ) : title.toLowerCase() === "offline data" ? (
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-[12px] font-light">
              12mb Cached
            </span>
            <ChevronRight className="text-gray-500 cursor-pointer" size={16} />
          </div>
        ) : (
          <ChevronRight className="text-gray-500 cursor-pointer" size={16} />
        )}
      </div>
    </div>
  );
}

export default SettingListItem;
