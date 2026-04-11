import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { Check, Trophy, Camera, User } from "lucide-react";
import Navigation from "../components/Navigation";
import Settings from "../components/Settings";
import ContributionCard from "../components/ContributionCard";
import RecentPriceCard from "../components/RecentPriceCard";
import { updateProfilePic } from "../store/slices/userSlice";

function Profile() {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null); // Reference to the hidden file input

  // Get data from Redux
  const user = useSelector((state) => state.user.profile);

  // Get the current user's ID from the user slice
  const currentUserId = user?.id || null;

  const allCommodities = useSelector((state) => state.prices.commodities);

  // Dynamic Filtering Logic
  const mySubmissions = currentUserId
    ? allCommodities.filter((item) => item.userId === currentUserId)
    : [];
  const verifiedCount = mySubmissions.filter(
    (s) => s.status === "Verified",
  ).length;
  const rejectedCount = mySubmissions.filter(
    (s) => s.status === "Rejected",
  ).length;
  const finalizedCount = verifiedCount + rejectedCount;
  const accuracy =
    finalizedCount > 0
      ? Math.round((verifiedCount / finalizedCount) * 100)
      : 100;

  const statusbar = [
    { title: "Price Submitted", value: mySubmissions.length, center: false },
    { title: "Verified", value: verifiedCount, center: false },
    { title: "Accuracy", value: accuracy + "%", center: true },
  ];

  // 5. IMAGE EDITING FUNCTION
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    // Basic validation
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      // When the file is read, it will be in base64 format (dataURL)
      reader.onloadend = () => {
        // Dispatch to Redux
        dispatch(updateProfilePic(reader.result));
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    } else {
      console.error("Please select a valid image file.");
    }
  };

  // Helper to trigger the hidden file input click
  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };
  if (!user) return <p>loading...</p>;
  return (
    <div className="flex h-screen bg-gray-50">
      <Navigation />

      {/* 6. HIDDEN FILE INPUT */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*" // Only accept images
        onChange={handleImageChange}
      />

      <div className="w-full flex flex-col gap-4 mt-14 lg:mt-0 md:ml-64 overflow-y-auto">
        {/* Banner Section with Edit Icon */}
        <div className="w-full bg-linear-to-r from-[#00C950] to-[#064e3b] p-8 sm:p-2 flex flex-col items-center justify-center gap-2">
          {/* IMAGE CONTAINER WITH EDIT ICON */}
          <div
            className="relative group cursor-pointer"
            onClick={triggerFileSelect}
          >
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover transition-opacity group-hover:opacity-80"
            />
            {/* Camera Overlay Icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 rounded-full">
              <Camera className="text-white" size={24} />
            </div>
          </div>

          <h1 className="text-white text-3xl font-bold mt-2">{user.name}</h1>
          <p className="text-white flex items-center gap-2 font-normal text-sm">
            📍 {user.location}
          </p>

          {/* BADGES CONTAINER */}
          <div className="flex flex-col items-center gap-4 text-white sm:flex-row mt-2">
            <div className="flex items-center gap-2 rounded-full bg-black/10 px-4 py-1.5 text-sm font-medium">
              <Trophy className="text-yellow-400" size={16} />
              {verifiedCount * 10} Rep Points
            </div>
            {user?.role === "admin" ? (
              <div className="flex items-center gap-2 rounded-full bg-purple-100 text-purple-600 px-4 py-1.5 text-sm font-bold shadow-sm">
                <Check size={16} /> Admin
              </div>
            ) : user?.isVerifiedUser ? (
              <div className="flex items-center gap-2 rounded-full bg-white text-[#00C950] px-4 py-1.5 text-sm font-bold shadow-sm">
                <Check size={16} className="text-[#00C950]" /> Verified Scout
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-full bg-gray-100 text-gray-500 px-4 py-1.5 text-sm font-bold shadow-sm">
                <User size={16} /> Regular User
              </div>
            )}
          </div>
        </div>

        {/* Contribution Section (Keep as is) */}
        <div className="w-full flex flex-col items-start gap-4 p-4 lg:justify-between lg:items-center lg:flex-row lg:p-6">
          <div className="w-full lg:w-[60%] flex flex-col gap-4">
            <div className="w-full border-2 p-2 border-gray-200 rounded-lg bg-white shadow-md lg:p-4">
              <h3 className="text-lg font-bold text-start">
                Contribution Stats
              </h3>
              <div className="flex flex-wrap gap-2 justify-between items-start sm:items-center sm:flex-nowarp">
                {statusbar.map((stat) => (
                  <ContributionCard
                    key={stat.title}
                    stat={stat}
                    center={stat.center}
                  />
                ))}
              </div>
            </div>

            <div className="w-full flex flex-col gap-2 border-2 border-gray-200 rounded-lg bg-white shadow-md p-4">
              <h3 className="text-lg font-bold text-start">My Activity</h3>
              <p className="text-gray-600 text-[14px]">
                Recent Price Submissions
              </p>
              <div>
                {mySubmissions.map((submission) => (
                  <RecentPriceCard key={submission.id} {...submission} />
                ))}
              </div>
            </div>
          </div>
          <Settings
            className={"w-full lg:w-[38%] rounded-lg bg-white shadow-md"}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
