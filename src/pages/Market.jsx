import { MapPin } from "lucide-react";
import Filter from "../components/Filter";
import MarketMap from "../components/MarketMap";
import Navigation from "../components/Navigation";
import NearByMarkets from "../components/NearByMarkets";
import SearchContainer from "../components/Search";

function Market() {
  return (
    <div className="flex h-screen">
      {/* Sidebar Navigation */}
      <Navigation />

      {/* Main Content */}
      <div className="flex flex-col gap-4 p-4 md:ml-64">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Market</h1>
            <p className="text-gray-600">
              Discover and explore community markets near you
            </p>
          </div>

          <div className="flex items-center gap-4">
            <SearchContainer placeholder="Search markets by name or location..." />
            <Filter />

            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-[#00C950]" />
              Lagos, Nigeria
            </div>
          </div>
        </div>
        {/* Market Section */}
        <div className="flex-1 flex gap-4">
          {/* Map */}
          <MarketMap />
          {/* Sidebar */}
          <NearByMarkets />
        </div>
      </div>
    </div>
  );
}

export default Market;
