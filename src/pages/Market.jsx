import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import MarketMap from "../components/MarketMap";
import NearByMarkets from "../components/NearByMarkets";
import SearchContainer from "../components/Search";
import FilterMarket from "../components/FilterMarket";
import AppShell from "../components/layout/AppShell";
import Card from "../components/ui/Card";
import PageIntro from "../components/ui/PageIntro";

// Redux Actions
import { updateNearbyMarkets } from "../store/slices/marketSlice";

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
    <AppShell contentClassName="z-0 flex flex-col gap-6 px-3 py-4 md:px-6 md:py-6 lg:h-screen">
      <PageIntro
        title="Markets"
        subtitle="Discover community markets near you and browse verified locations faster."
      />

      <Card className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between" padding="md">
        <div className="flex w-full flex-col items-start gap-4 lg:flex-row lg:items-center lg:w-auto">
          <SearchContainer placeholder="Search markets..." page="markets" />

          <div className="flex flex-row items-center gap-4">
            <FilterMarket />
            <div className="flex items-center gap-2 rounded-full border border-gray-100 bg-gray-50 px-3 py-1.5 whitespace-nowrap">
              <MapPin size={16} className="shrink-0 text-[#00C950]" />
              <span className="text-sm font-semibold text-gray-700">
                {displayAddress}
              </span>
            </div>
          </div>
        </div>
      </Card>

      <div className="min-h-0 flex flex-1 flex-col gap-6 lg:flex-row">
        <Card className="h-96 shrink-0 lg:h-full lg:flex-1" padding="none">
          <MarketMap />
        </Card>
        <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar">
          <NearByMarkets />
        </div>
      </div>
    </AppShell>
  );
}

export default Market;
