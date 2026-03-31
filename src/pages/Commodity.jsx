import { Bell, Clock, MapPin } from "lucide-react";
import Navigation from "../components/Navigation";

function Commodity() {
  return (
    <div className="flex h-screen">
      <Navigation />
      <div className="flex-1 flex flex-col gap-4 p-4 md:ml-64">
        <div className="flex items-center justify-between gap-4 mb-2 p-4 text-sm">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-[#00C950] text-sm" />
            <p>
              <span className="font-light text-gray-500">
                Lagos &gt; Kosofo &gt;
              </span>{" "}
              <span className="font-semibold">Mile 12 Market</span>
            </p>
            <div className="text-sm text-[#00C950] underline cursor-pointer">
              Change location
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Bell size={20} />
            <Clock className="text-gray-500" size={16} />
            <span className="text-gray-500">Last updated: 2mins ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Commodity;
