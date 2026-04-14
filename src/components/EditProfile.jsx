import { User, Camera, Mail, Briefcase } from "lucide-react";
import Card from "./ui/Card";
import Button from "./ui/Button";

function EditProfile({ profile }) {
  return (
    <div className="space-y-6">
      <Card padding="lg" className="relative overflow-hidden">
        {/* Decorative Background Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[#00C950]" />

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar Section */}
          <div className="relative group">
            <div className="w-24 h-24 rounded-3xl bg-gray-100 flex items-center justify-center border-4 border-white shadow-md overflow-hidden">
              {profile?.avatar ? (
                <img
                  src={profile.avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={40} className="text-gray-400" />
              )}
            </div>
            <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-lg border border-gray-100 text-[#00C950] hover:scale-110 transition-transform">
              <Camera size={18} />
            </button>
          </div>

          {/* Form Fields */}
          <div className="flex-1 w-full grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  defaultValue={profile?.name || "John Doe"}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 pl-12 pr-4 focus:ring-4 focus:ring-[#00C950]/10 focus:border-[#00C950] transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="email"
                  disabled
                  defaultValue={profile?.email || "user@example.com"}
                  className="w-full bg-gray-100 border border-gray-100 rounded-2xl py-3 pl-12 pr-4 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Professional Role
              </label>
              <div className="relative">
                <Briefcase
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 pl-12 pr-4 focus:ring-4 focus:ring-[#00C950]/10 focus:border-[#00C950] appearance-none transition-all outline-none">
                  <option>Wholesale Trader</option>
                  <option>Market Analyst</option>
                  <option>Logistics Provider</option>
                  <option>Retailer</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-50 flex justify-end gap-3">
          <Button variant="secondary">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </Card>
    </div>
  );
}
export default EditProfile;
