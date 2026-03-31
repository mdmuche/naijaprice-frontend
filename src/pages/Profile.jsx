import { Check, Trophy } from "lucide-react";
import Navigation from "../components/Navigation";
import Settings from "../components/Settings";
import ContributionCard from "../components/ContributionCard";
import RecentPriceCard from "../components/RecentPriceCard";

function Profile() {
  const statusbar = [
    { title: "Price Submitted", value: 87 },
    { title: "Verified", value: 64 },
    { title: "Accuracy", value: 92 + "%" },
  ];
  const recentPriceSubmissions = [
    {
      id: 1,
      title: "Rice (1kg)",
      snippet: "Price for 1kg of rice",
      price: 450,
      date: "jan 15",
      status: "Verified",
    },
    {
      id: 2,
      title: "Beans (1kg)",
      snippet: "Price for 1kg of beans",
      price: 300,
      date: "jan 14",
      status: "Pending",
    },
    {
      id: 3,
      title: "Cereal (1kg)",
      snippet: "Price for 1kg of cereal",
      price: 250,
      date: "jan 13",
      status: "Rejected",
    },
    {
      id: 4,
      title: "Oil (1L)",
      snippet: "Price for 1L of oil",
      price: 1200,
      date: "jan 12",
      status: "Verified",
    },
    {
      id: 5,
      title: "Milk (1L)",
      snippet: "Price for 1L of milk",
      price: 200,
      date: "jan 11",
      status: "Pending",
    },
  ];
  return (
    <div className="flex h-screen">
      <Navigation />

      <div className="w-full flex flex-col gap-4 md:ml-64">
        <div className="w-full bg-linear-to-r from-[#00C950] to-[#064e3b] p-4 flex flex-col items-center justify-center">
          <img
            src="/images/profile-dp.svg"
            alt="Profile"
            className="w-25 h-25 rounded-full border-2 border-white"
          />
          <h1 className="text-white text-2xl font-bold">Chiamako O.</h1>
          <p className="text-white flex items-center gap-2 font-normal">
            📍 Minna, Niger State
          </p>
          <div className="flex items-center gap-4 text-white">
            <div className="flex items-center gap-2 rounded-lg bg-[#00A840]/20 px-2 py-1">
              <Trophy className="text-yellow-500" size={16} />
              1250 Rep Points
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-white text-[#00C950] px-2 py-1">
              <div className="bg-[#00C950] text-white p-1 rounded border-2 border-gray-200">
                <Check size={16} />
              </div>
              Verified Scouts
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between items-center p-4">
          <div className="w-[60%] flex flex-col gap-4">
            <div className="w-full border-2 border-gray-200 rounded-lg bg-white shadow-md p-4">
              <h3 className="text-lg font-bold text-start">
                Contribution Stats
              </h3>
              <div className="flex justify-between items-center">
                {statusbar.map((stat) => (
                  <ContributionCard key={stat.title} stat={stat} />
                ))}
              </div>
            </div>
            <div className="w-full border-2 border-gray-200 rounded-lg bg-white shadow-md p-4">
              <h3 className="text-lg font-bold text-start">My Activity</h3>
              <p className="text-gray-600 text-[14px]">
                Recent Price Submissions
              </p>
              <div>
                {recentPriceSubmissions.map((submission) => (
                  <RecentPriceCard key={submission.id} {...submission} />
                ))}
              </div>
            </div>
          </div>
          <Settings className={"w-[38%] rounded-lg bg-white shadow-md"} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
