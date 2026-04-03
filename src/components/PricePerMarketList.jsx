import PricePerMarketCard from "./PricePerMarketCard";

function PricePerMarketList() {
  const pricePerMarketList = [
    {
      id: 1,
      market: "Mile 12 Market",
      price: 45000,
      location: "kosofe LGA, Lagos",
      status: "verified",
      timeAgo: "2hr ago",
      trendDirection: "down",
      trendValue: "4.8",
    },
    {
      id: 2,
      market: "Epe Market",
      price: 38500,
      location: "Epe LGA, Lagos",
      status: "crowdsourced",
      timeAgo: "5hr ago",
      trendDirection: "down",
      trendValue: "-14",
    },
    {
      id: 3,
      market: "Jakande Market",
      price: 48000,
      location: "Eti-osa LGA, Lagos",
      status: "verified",
      timeAgo: "1hr ago",
      trendDirection: "up",
      trendValue: "+7",
    },
  ];
  return (
    <div className="w-full xl:w-[38%]">
      <div className="w-full flex items-center justify-between">
        <h3>Price per Market</h3>
        <div className="text-[#00C950] bg-gray-200 py-2 px-3 cursor-pointer rounded-lg">
          View All
        </div>
      </div>
      <div>
        {pricePerMarketList.map((pricePerMarket) => (
          <PricePerMarketCard key={pricePerMarket.id} {...pricePerMarket} />
        ))}
      </div>
    </div>
  );
}

export default PricePerMarketList;
