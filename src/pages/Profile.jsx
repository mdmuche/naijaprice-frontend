import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Camera, Check, Trophy, User } from "lucide-react";
import ContributionCard from "../components/ContributionCard";
import RecentPriceCard from "../components/RecentPriceCard";
import Settings from "../components/Settings";
import AppShell from "../components/layout/AppShell";
import { updateProfilePic } from "../store/slices/userSlice";
import Pagination from "../components/Pagination";

function Profile() {
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const user = useSelector((state) => state.user.profile);
  const allCommodities = useSelector((state) => state.prices.commodities);

  const itemsPerPage = 8;

  const currentUserId = user?.id || null;
  const mySubmissions = currentUserId
    ? allCommodities.filter((item) => item.userId === currentUserId)
    : [];
  const verifiedCount = mySubmissions.filter(
    (submission) => submission.status === "Verified",
  ).length;
  const rejectedCount = mySubmissions.filter(
    (submission) => submission.status === "Rejected",
  ).length;
  const finalizedCount = verifiedCount + rejectedCount;
  const accuracy =
    finalizedCount > 0
      ? Math.round((verifiedCount / finalizedCount) * 100)
      : 100;

  const statusbar = [
    { title: "Price Submitted", value: mySubmissions.length, center: false },
    { title: "Verified", value: verifiedCount, center: false },
    { title: "Accuracy", value: `${accuracy}%`, center: true },
  ];

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file || !file.type.startsWith("image/")) {
      console.error("Please select a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(updateProfilePic(reader.result));
    };
    reader.readAsDataURL(file);
  };

  if (!user) return <p>loading...</p>;

  const totalPages = Math.ceil(mySubmissions.length / itemsPerPage);
  const safePage = currentPage >= totalPages ? 0 : currentPage;
  const startIndex = safePage * itemsPerPage;
  const visibleItems = mySubmissions.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
  return (
    <AppShell contentClassName="flex flex-col gap-4">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />

      <div className="w-full bg-linear-to-r from-[#00C950] to-[#064e3b] p-8 sm:p-2">
        <div className="flex flex-col items-center justify-center gap-2">
          <div
            className="group relative cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <img
              src={user.profilePic}
              alt="Profile"
              className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg transition-opacity group-hover:opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
              <Camera className="text-white" size={24} />
            </div>
          </div>

          <h1 className="mt-2 text-3xl font-bold text-white">{user.name}</h1>
          <p className="text-sm font-normal text-white">{user.location}</p>

          <div className="mt-2 flex flex-col items-center gap-4 text-white sm:flex-row">
            <div className="flex items-center gap-2 rounded-full bg-black/10 px-4 py-1.5 text-sm font-medium">
              <Trophy className="text-yellow-400" size={16} />
              {verifiedCount * 10} Rep Points
            </div>
            {user.role === "admin" ? (
              <div className="flex items-center gap-2 rounded-full bg-purple-100 px-4 py-1.5 text-sm font-bold text-purple-600 shadow-sm">
                <Check size={16} /> Admin
              </div>
            ) : user.isVerifiedUser ? (
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-bold text-[#00C950] shadow-sm">
                <Check size={16} className="text-[#00C950]" /> Verified Scout
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1.5 text-sm font-bold text-gray-500 shadow-sm">
                <User size={16} /> Regular User
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full p-4 lg:p-6">
        <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex w-full flex-col gap-4 lg:w-[60%]">
            <div className="w-full rounded-lg border-2 border-gray-200 bg-white p-2 shadow-md lg:p-4">
              <h3 className="text-start text-lg font-bold">
                Contribution Stats
              </h3>
              <div className="flex flex-wrap items-start justify-between gap-2 sm:items-center">
                {statusbar.map((stat) => (
                  <ContributionCard
                    key={stat.title}
                    stat={stat}
                    center={stat.center}
                  />
                ))}
              </div>
            </div>

            <div className="flex w-full flex-col gap-2 rounded-lg border-2 border-gray-200 bg-white p-4 shadow-md">
              <h3 className="text-start text-lg font-bold">My Activity</h3>
              <p className="text-[14px] text-gray-600">
                Recent Price Submissions
              </p>
              <div>
                {visibleItems.map((submission) => (
                  <RecentPriceCard key={submission.id} {...submission} />
                ))}
                <Pagination
                  page={safePage}
                  totalPages={totalPages}
                  onPrev={() => setCurrentPage((prev) => prev - 1)}
                  onNext={() => setCurrentPage((prev) => prev + 1)}
                  slider={true}
                />
              </div>
            </div>
          </div>

          <Settings className="w-full rounded-lg bg-white shadow-md lg:w-[38%]" />
        </div>
      </div>
    </AppShell>
  );
}

export default Profile;
