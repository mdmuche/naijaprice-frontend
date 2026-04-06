import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import MarketMap from "../components/MarketMap";
import Navigation from "../components/Navigation";
import NearByMarkets from "../components/NearByMarkets";
import SearchContainer from "../components/Search";
import FilterMarket from "../components/FilterMarket";

// Redux Actions
import {
  setSearchQuery,
  updateNearbyMarkets,
} from "../store/slices/marketSlice";

function Market() {
  const dispatch = useDispatch();

  // Selectors from Redux
  const { filteredMarkets, searchQuery } = useSelector(
    (state) => state.markets,
  );

  // Local State ONLY for the GPS-fetched address
  const [gpsAddress, setGpsAddress] = useState("Lagos, Nigeria");

  // 1. DERIVED STATE: Calculate the display address during render
  // This avoids the "cascading render" error by not using an effect for search results
  const displayAddress =
    searchQuery && filteredMarkets?.length > 0
      ? filteredMarkets[0].location
      : gpsAddress;

  useEffect(() => {
    // Only run GPS logic if we aren't searching
    if (!searchQuery) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude: lat, longitude: lng } = pos.coords;
          dispatch(updateNearbyMarkets({ lat, lng }));

          const fetchCityName = async () => {
            try {
              const res = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
              );
              const data = await res.json();
              if (data.city || data.locality) {
                setGpsAddress(
                  `${data.city || data.locality}, ${data.countryName || "Nigeria"}`,
                );
              }
            } catch (err) {
              console.error("Error:", err);
              setGpsAddress("Lagos, Nigeria");
            }
          };
          fetchCityName();
        },
        () => {
          const fallback = { lat: 6.5244, lng: 3.3792 };
          dispatch(updateNearbyMarkets(fallback));
          setGpsAddress("Lagos, Nigeria");
        },
      );
    }
  }, [dispatch, searchQuery]); // Removed filteredMarkets from dependencies to prevent loops

  return (
    <div className="flex min-h-screen">
      <Navigation />
      <div className="flex flex-1 flex-col gap-4 p-2 mt-4 z-0 lg:mt-0 lg:p-4 md:ml-64 lg:h-screen">
        <div className="flex flex-col items-start justify-between xl:items-center xl:flex-row gap-4">
          <div>
            <h1 className="text-2xl font-bold">Market</h1>
            <p className="text-gray-600">Discover community markets near you</p>
          </div>

          <div className="flex flex-col items-start lg:items-center gap-4 lg:flex-row w-full lg:w-auto">
            <SearchContainer
              placeholder="Search markets..."
              page="markets"
              action={setSearchQuery}
              selector={(state) => state.markets.searchQuery}
            />

            <div className="flex flex-row items-center gap-4">
              <FilterMarket />
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 whitespace-nowrap">
                <MapPin size={16} className="text-[#00C950] shrink-0" />
                <span className="text-sm font-semibold text-gray-700">
                  {displayAddress} {/* Use the derived address here */}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="z-0 flex-1 flex flex-col gap-8 lg:flex-row lg:gap-4 min-h-0">
          <div className="h-96 shrink-0 lg:h-full lg:flex-1">
            <MarketMap />
          </div>
          <div className="flex-1 min-h-0 lg:h-full lg:flex-1 overflow-y-auto custom-scrollbar">
            <NearByMarkets />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Market;
