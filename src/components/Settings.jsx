import {
  Bell,
  CircleAlert,
  Globe,
  HardDrive,
  LogOut,
  MapPin,
  UserPen,
} from "lucide-react";
import SettingListItem from "./SettingListItem";

function Settings({ className }) {
  const settingsList = [
    {
      id: 1,
      title: "Edit Profile",
      icon: <UserPen size={16} />,
    },
    {
      id: 2,
      title: "Preferred Markets",
      icon: <MapPin size={16} />,
    },
    {
      id: 3,
      title: "Notifications Settings",
      icon: <Bell size={16} />,
    },
    {
      id: 4,
      title: "Offline Data",
      icon: <HardDrive size={16} />,
    },
    {
      id: 5,
      title: "Language",
      icon: <Globe size={16} />,
    },
    {
      id: 6,
      title: "About NaijaPrice",
      icon: <CircleAlert size={16} />,
    },
  ];
  return (
    <div
      className={`${className} flex flex-col p-2 gap-10 border-2 border-gray-200 sm:p-4`}
    >
      <h3>Settings</h3>
      {settingsList.map((item) => (
        <SettingListItem key={item.id} {...item} />
      ))}
      <div className="flex items-center gap-2 text-red-500 mt-4">
        <div className="bg-[#FF0000]/10 p-2 rounded-lg w-fit cursor-pointer">
          <LogOut size={16} />
        </div>

        <button>Log Out</button>
      </div>
    </div>
  );
}

export default Settings;
