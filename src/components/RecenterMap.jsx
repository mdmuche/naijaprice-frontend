import { useEffect } from "react";
import { useMap } from "react-leaflet";

function RecenterMap({ location }) {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lng], 13, { duration: 2 });
    }
  }, [location, map]);
  return null;
}
export default RecenterMap;
