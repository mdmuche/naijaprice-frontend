import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
} from "react-leaflet";
import { useSelector } from "react-redux";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Ellipse, List, Map as MapIcon } from "lucide-react";
import { useEffect } from "react";

const ACCESS_TOKEN = import.meta.env.VITE_MAP_ACCESS_TOKEN;

// 1. IMPROVED VIEW HANDLER: Uses flyTo for a smoother "GPS" feel
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom || map.getZoom(), {
        duration: 1.5, // Seconds
        easeLinearity: 0.25,
      });
    }
  }, [center, zoom, map]);
  return null;
}

export default function MarketMap() {
  const { userLocation, filteredMarkets } = useSelector(
    (state) => state.markets,
  );

  // Determine the center: Priority to User -> First Market -> Default Lagos
  const mapCenter = userLocation
    ? [userLocation.lat, userLocation.lng]
    : filteredMarkets.length > 0
      ? filteredMarkets[0].coords
      : [6.5244, 3.3792];

  return (
    <div className="w-full h-full z-0 flex flex-col">
      {/* Header UI */}
      <div className="flex flex-col items-start justify-between xl:items-center mb-4 xl:flex-row">
        <div className="flex gap-2 items-center">
          <div className="w-fit flex items-center gap-4 p-2 rounded-lg bg-[#00C950] text-white font-normal cursor-pointer">
            <MapIcon size={20} /> Map View
          </div>
          <div className="w-fit flex items-center gap-4 p-2 rounded-lg bg-gray-200 text-gray-800 font-normal cursor-pointer">
            <List size={20} /> List View
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600 mt-2 md:mt-0">
          <Ellipse size={12} className="fill-current text-[#00C950]" />
          {filteredMarkets.length} markets found near you
        </div>
      </div>

      {/* Map Container */}
      <MapContainer
        center={mapCenter}
        zoom={13}
        className="h-full w-full rounded-xl overflow-hidden shadow-inner"
      >
        <ChangeView center={mapCenter} zoom={14} />

        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/{z}/{x}/{y}@2x?access_token=${ACCESS_TOKEN}`}
          tileSize={512}
          zoomOffset={-1}
          attribution='&copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        />

        {/* 2. USER LOCATION MARKER: The "Blue Dot" */}
        {userLocation && (
          <>
            <Circle
              center={[userLocation.lat, userLocation.lng]}
              radius={400}
              pathOptions={{
                color: "#00C950",
                fillColor: "#00C950",
                fillOpacity: 0.15,
                weight: 1,
              }}
            />
            <Marker
              position={[userLocation.lat, userLocation.lng]}
              icon={L.divIcon({
                className: "custom-user-marker",
                html: `<div class="w-4 h-4 bg-[#00C950] border-2 border-white rounded-full shadow-[0_0_10px_#00C950] animate-pulse"></div>`,
              })}
            >
              <Popup>You are here</Popup>
            </Marker>
          </>
        )}

        {/* 3. MARKET MARKERS */}
        {filteredMarkets.map((m) => (
          <Marker key={m.id} position={m.coords}>
            <Popup>
              <div className="p-1">
                <h4 className="font-bold text-slate-900">{m.title}</h4>
                <p className="text-xs text-gray-500">{m.location}</p>
                <p className="text-xs font-semibold text-[#00C950] mt-1">
                  {m.distance}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
