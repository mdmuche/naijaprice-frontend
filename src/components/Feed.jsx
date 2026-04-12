import CommodityCard from "./CommodityCard";
import EmptyState from "./ui/EmptyState";

function Feed({ items }) {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3">
      {items && items.length > 0 ? (
        items.map((item) => <CommodityCard key={item.id} item={item} />)
      ) : (
        <div className="col-span-full">
          <EmptyState
            title="No commodities found"
            description="Try adjusting your filters, changing market, or broadening your search."
          />
        </div>
      )}
    </div>
  );
}

export default Feed;
