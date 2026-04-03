import { ArrowLeft, Share2, TrendingDown, TrendingUp } from "lucide-react";
import Navigation from "../components/Navigation";
import BtnSecondary from "../components/BtnSecondary";
import { commodities } from "../data";
import { useParams } from "react-router-dom";
import PriceHistory from "../components/PriceHistory";
import PricePerMarketList from "../components/PricePerMarketList";

function Commodity() {
  const { id } = useParams();
  const commodityData = commodities.find((item) => item.id === Number(id));
  return (
    <div className="flex h-screen">
      <Navigation />
      <div className="flex-1 flex flex-col gap-4 p-2 sm:p-4 md:ml-64">
        {commodityData ? (
          <>
            <div className="flex flex-col items-start gap-2 mt-4 lg:mt-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4 mb-2 p-4 text-sm">
              <div className="flex items-center gap-2">
                <ArrowLeft size={16} className="text-black" />
                <p>
                  <span className="font-light text-gray-500">
                    Prices &gt; Vegetables &gt;
                  </span>{" "}
                  <span className="font-semibold">Tomatoes (Big Basket)</span>
                </p>
              </div>
              <div>
                <BtnSecondary icon={<Share2 size={16} />} text="Share" />
              </div>
            </div>
            <div className="flex flex-col items-center p-4">
              {commodities
                .filter((commodity) => commodity.id === Number(id))
                .map((commodity) => (
                  <div
                    key={commodity.id}
                    className="flex flex-col gap-2 items-center"
                  >
                    {" "}
                    <div className="flex gap-2 items-center">
                      {" "}
                      <img
                        className="w-12.5 h-12.5 rounded-lg object-cover"
                        src={commodity.image}
                        alt={commodity.title}
                      />
                      <h3 className="text-lg font-bold mt-2">
                        {commodity.title}
                      </h3>
                    </div>
                    <span className="text-3xl font-bold">
                      {commodity.price}
                    </span>
                    <p className="text-gray-500 text-sm mt-2">
                      {commodity.snippet}
                    </p>
                    <div
                      className={`flex items-center gap-2 mt-2 ${commodity.trendDirection === "down" ? "bg-red-100" : "bg-[#00C950]/10"} p-2 rounded-xl`}
                    >
                      {commodity.trendDirection === "down" ? (
                        <TrendingDown size={16} className="text-red-500" />
                      ) : (
                        <TrendingUp size={16} className="text-green-500" />
                      )}
                      <div
                        className={`${commodity.trendDirection === "down" ? "text-red-500" : "text-green-500"} text-sm font-bold`}
                      >
                        <span className="mr-2">{commodity.trend}%</span>
                        vs yesterday
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div
              className="flex flex-col gap-2 xl:flex-row xl:justify-between
            "
            >
              <PriceHistory />
              <PricePerMarketList />
            </div>
          </>
        ) : (
          <div>No Items</div>
        )}
      </div>
    </div>
  );
}

export default Commodity;
