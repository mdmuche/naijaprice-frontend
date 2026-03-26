import CommodityCard from "./CommodityCard";
import { commodities } from "../data";

function Feed() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4">
      {commodities.map((item) => (
        <CommodityCard key={item.id} item={item} />
      ))}
    </div>
  );
}
export default Feed;
