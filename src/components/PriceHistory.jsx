import CommodityTrendChart from "./CommodityTrendChart";

function PriceHistory() {
  return (
    <div className="w-full xl:w-[60%]">
      <div className="w-full flex justify-end">
        <div className="w-[70%] mb-2 sm:w-[30%] grid grid-cols-3 gap-2">
          <div className="text-center py-2 border border-gray-300 rounded-2xl bg-white shadow-md">
            7D
          </div>
          <div className="text-center py-2 border border-gray-300 rounded-2xl bg-white shadow-md">
            14D
          </div>
          <div className="text-center py-2 border border-gray-300 rounded-2xl bg-[#00C950] shadow-md text-white">
            30D
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold">3O Day Price History</h2>
        <p className="text-sm font-normal text-gray-500">
          Price Trend for Tomatoes (Big Basket) in Lagos
        </p>
      </div>
      <CommodityTrendChart />
    </div>
  );
}

export default PriceHistory;
