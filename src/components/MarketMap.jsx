import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Ellipse, List, Map } from "lucide-react";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Sample market data
const MARKETS = [
  { id: 1, name: "Mile 12 International Market", coords: [6.6018, 3.3875] },
  { id: 2, name: "Oyingbo Market", coords: [6.4698, 3.3852] },
  { id: 3, name: "Balogun Market", coords: [6.4534, 3.3948] },
];

export default function MarketMap() {
  return (
    <div className="w-full h-full z-0 flex flex-col">
      <div className="flex flex-col items-start justify-between xl:items-center mb-4 xl:flex-row">
        <div className="flex gap-2 items-center">
          <div className="w-fit flex items-center gap-4 p-2 rounded-lg bg-[#00C950] text-white font-normal cursor-pointer">
            <Map />
            Map View
          </div>
          <div className="w-fit flex items-center gap-4 p-2 rounded-lg bg-gray-200 text-gray-800 font-normal cursor-pointer">
            <List />
            List View
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600 mt-2 md:mt-0">
          <Ellipse />5 markets found in Lagos
        </div>
      </div>
      <MapContainer
        center={[6.5244, 3.3792]}
        zoom={12}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {MARKETS.map((m) => (
          <Marker key={m.id} position={m.coords}>
            <Popup>{m.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
