import CommodityCard from "./CommodityCard";
// REMOVED: import { commodities } from "../data";

function Feed({ items }) {
  // Accepting items as a prop
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4">
      {/* If there are no items (e.g., search found nothing), show a message */}
      {items && items.length > 0 ? (
        items.map((item) => <CommodityCard key={item.id} item={item} />)
      ) : (
        <div className="col-span-full text-center py-10 text-gray-500">
          No commodities found matching your filters.
        </div>
      )}
    </div>
  );
}

export default Feed;
