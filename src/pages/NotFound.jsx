import { Home, Search, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import BtnSecondary from "../components/BtnSecondary";

function NotFound() {
  return (
    <AppShell contentClassName="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      {/* Visual Element */}
      <div className="relative mb-8">
        <div className="absolute -inset-4 rounded-full bg-[#00C950]/10 blur-xl"></div>
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg border-2 border-gray-100">
          <Search size={48} className="text-[#00C950]" />
        </div>
        <MapPin
          className="absolute -bottom-2 -right-2 text-red-500 bg-white rounded-full p-1 shadow-md"
          size={28}
        />
      </div>

      {/* Text Content */}
      <h1 className="text-4xl font-black text-gray-900 mb-2">404</h1>
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Oshey! This page is lost in the market.
      </h2>
      <p className="max-w-md text-gray-600 mb-8 leading-relaxed">
        We couldn't find the commodity or page you're looking for. It might have
        been moved, or the link is broken.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-none justify-center">
        <Link to="/">
          <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#00C950] px-8 py-3 font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95">
            <Home size={20} />
            Go Back Home
          </button>
        </Link>

        <Link to="/explore">
          <BtnSecondary
            text="Explore Markets"
            className="w-full sm:w-auto border-2 border-gray-200"
          />
        </Link>
      </div>

      {/* Decorative localized hint */}
      <p className="mt-12 text-sm text-gray-400 font-medium italic">
        Maybe try checking Mile 12 or Mushin Market? 😉
      </p>
    </AppShell>
  );
}

export default NotFound;
