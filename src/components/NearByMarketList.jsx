import NearbyMarketCard from "./NearbyMarketCard";

const list = [
  {
    title: "Mile 12 international market",
    location: "Kosofo LGA, Lagos State",
    distance: "3.2 km away",
    reports: "47 reports today",
    status: "active",
    timeAgo: "2 min ago",
  },
  {
    title: "Mile 12 international market",
    location: "Kosofo LGA, Lagos State",
    distance: "3.2 km away",
    reports: "47 reports today",
    status: "active",
    timeAgo: "2 min ago",
  },
  {
    title: "Mile 12 international market",
    location: "Kosofo LGA, Lagos State",
    distance: "3.2 km away",
    reports: "47 reports today",
    status: "active",
    timeAgo: "2 min ago",
  },
  {
    title: "Mile 12 international market",
    location: "Kosofo LGA, Lagos State",
    distance: "3.2 km away",
    reports: "47 reports today",
    status: "quiet",
    timeAgo: "2 min ago",
  },
  {
    title: "Mile 12 international market",
    location: "Kosofo LGA, Lagos State",
    distance: "3.2 km away",
    reports: "47 reports today",
    status: "active",
    timeAgo: "2 min ago",
  },
];

function NearByMarketList() {
  return (
    <div className="flex flex-col gap-4">
      {list.map((market, index) => (
        <NearbyMarketCard
          key={index}
          title={market.title}
          location={market.location}
          distance={market.distance}
          reports={market.reports}
          status={market.status}
          timeAgo={market.timeAgo}
        />
      ))}
      <div className="flex items-center justify-center">
        <button className="text-[#00C950] font-bold text-[16px] cursor-pointer">
          + Suggest a Market
        </button>
      </div>
    </div>
  );
}

export default NearByMarketList;
