import { ArrowLeft, Share2, TrendingDown, TrendingUp } from "lucide-react";
import BtnSecondary from "../components/BtnSecondary";
import { useParams } from "react-router-dom";
import PriceHistory from "../components/PriceHistory";
import PricePerMarketList from "../components/PricePerMarketList";
import { useState } from "react";
import { priceHistory } from "../utils/priceHistoryData";
import AppShell from "../components/layout/AppShell";
import { initialReports } from "../utils/initialData";

function Commodity() {
  const { id } = useParams();
  // 1. Get dynamic items from localStorage (or Redux if you're using it)
  const localData =
    JSON.parse(localStorage.getItem("naijaprice_commodities")) || [];

  // 2. Combine the static priceHistory with the local data
  const allItems = [...priceHistory, ...initialReports, ...localData];

  const commodityData = allItems.find((item) => String(item.id) === String(id));

  // 1. Only store the MARKET in state, not the Title.
  // The Title is already known from the URL/commodityData.
  const [activeMarket, setActiveMarket] = useState(
    commodityData ? commodityData.market : "",
  );

  // 2. Create a "derived" object to pass to the Graph.
  // This is NOT state, it's just a variable calculated on every render.
  const activeItem = {
    title: commodityData?.title || "",
    market: activeMarket,
  };

  // if (!commodityData) return <div>Loading...</div>;

  return (
    <AppShell contentClassName="flex flex-col gap-4 p-2 sm:p-4">
      {commodityData ? (
        <>
          <div className="mb-2 mt-4 flex flex-col items-start gap-2 p-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4 lg:mt-0">
            <div className="flex items-center gap-2">
              <ArrowLeft size={16} className="text-black" />
              <p>
                <span className="font-light text-gray-500">
                  Prices &gt; Vegetables &gt;
                </span>{" "}
                <span className="font-semibold">Tomatoes (Big Basket)</span>
              </p>
            </div>
            <BtnSecondary icon={<Share2 size={16} />} text="Share" />
          </div>

          <div className="flex flex-col items-center p-4">
            <div
              key={commodityData.id}
              className="flex flex-col items-center gap-2"
            >
              <div className="flex items-center gap-2">
                <img
                  className="h-12.5 w-12.5 rounded-lg object-cover"
                  src={commodityData.image}
                  alt={commodityData.title}
                />
                <h3 className="mt-2 text-lg font-bold">
                  {commodityData.title}
                </h3>
              </div>
              <span className="text-3xl font-bold">{commodityData.price}</span>
              <p className="mt-2 text-sm text-gray-500">
                {commodityData.snippet}
              </p>
              <div
                className={`mt-2 flex items-center gap-2 rounded-xl p-2 ${
                  commodityData.trendDirection === "down"
                    ? "bg-[#00C950]/10"
                    : "bg-red-100"
                }`}
              >
                {commodityData.trendDirection === "down" ? (
                  <TrendingDown size={16} className="text-green-500" />
                ) : (
                  <TrendingUp size={16} className="text-red-500" />
                )}
                <div
                  className={`text-sm font-bold ${
                    commodityData.trendDirection === "down"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  <span className="mr-2">{commodityData.trend}%</span>
                  vs yesterday
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 p-4 xl:flex-row xl:justify-between">
            <PriceHistory selectedCommodity={activeItem} />

            <PricePerMarketList
              onMarketSelect={(selection) => setActiveMarket(selection.market)}
              activeMarket={activeMarket}
              commodityTitle={commodityData.title}
            />
          </div>
        </>
      ) : (
        <div>No Items</div>
      )}
    </AppShell>
  );
}

export default Commodity;
