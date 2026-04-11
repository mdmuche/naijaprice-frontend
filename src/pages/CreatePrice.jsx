import {
  Camera,
  Check,
  CircleAlert,
  MapPin,
  Plus,
  Send,
  Star,
  TriangleAlert,
  X,
  ChevronRight,
  Search as SearchIcon,
} from "lucide-react";
import Navigation from "../components/Navigation";
import Search from "../components/Search";
import { useRef, useState, useEffect, useMemo } from "react";
import { allMarketsData } from "../utils/marketData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPriceReport } from "../store/slices/priceSlice";
import { newDate } from "../utils/monthDate";

function CreatePrice() {
  // 1. Get the logged-in user's profile
  const user = useSelector((state) => state.user.profile);
  // --- REDUX & ROUTING ---
  const commodities = useSelector((state) => state.prices.commodities);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- UI & ANIMATION STATES ---
  const [isChanging, setIsChanging] = useState(false);
  const [gpsError, setGpsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- FORM DATA STATES ---
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Vegetables");
  const [selectedItem, setSelectedItem] = useState(null);
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("Bag");
  const [preview, setPreview] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fileInputRef = useRef();
  // const scrollRef = useRef();

  // --- SMART GPS DETECTION LOGIC ---
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Haversine-adjacent calculation for closest market
          let closest = allMarketsData[0];
          let minDistance = Infinity;

          allMarketsData.forEach((market) => {
            const dist = Math.sqrt(
              Math.pow(market.coords[0] - latitude, 2) +
                Math.pow(market.coords[1] - longitude, 2),
            );
            if (dist < minDistance) {
              minDistance = dist;
              closest = market;
            }
          });
          setSelectedMarket(closest);
          setGpsError(false);
        },
        (error) => {
          console.error("GPS Error:", error);
          setGpsError(true);
          setSelectedMarket(allMarketsData[0]); // Fallback
        },
        { enableHighAccuracy: true, timeout: 5000 },
      );
    }
  }, []);

  // --- 2. DYNAMIC ITEM FILTERING ---
  const filteredItems = useMemo(() => {
    return commodities.filter((item) => {
      const matchesCategory = item.category === selectedCategory;
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, commodities]);

  // --- 3. EVENT HANDLERS ---
  const handleFileClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        // Reduced to 1MB for LocalStorage safety
        alert(
          "File is too large. Try an image under 1MB for better performance.",
        );
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setPreview(base64String); // This stores the Base64 string in state
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!selectedItem || !price || !selectedMarket)
      return alert("Missing fields");

    // 1. Calculate Trend by comparing to the existing Redux state
    const previousReport = commodities.find(
      (c) =>
        c.title === selectedItem.title && c.market === selectedMarket.title,
    );

    let trendPercentage = 0;
    let trendDir = "neutral";

    if (previousReport && previousReport.price > 0) {
      const oldPrice = previousReport.price;
      const newPrice = Number(price);

      // Calculate percentage: ((New - Old) / Old) * 100
      trendPercentage = ((newPrice - oldPrice) / oldPrice) * 100;
      trendPercentage = parseFloat(trendPercentage.toFixed(1)); // e.g. 5.2

      if (newPrice > oldPrice) trendDir = "up";
      else if (newPrice < oldPrice) trendDir = "down";
    }

    // 2. Construct the object to match your CommodityCard requirements
    const reportData = {
      id: `rep-${Date.now()}`,
      userId: user.id,
      title: selectedItem.title,
      category: selectedCategory,
      market: selectedMarket.title,
      price: Number(price),
      // CRITICAL: Card uses 'snippet' for the subtitle (e.g., "1 Bag")
      snippet: `${unit}`,
      // CRITICAL: Use the path from the selected item if no new photo was taken
      image: preview || selectedItem.image || "/images/default-food.svg",
      source: "crowdsourced",
      date: newDate(),
      status: "pending",
      trend: Math.abs(trendPercentage), // Card expects a positive number for display
      trendDirection: trendDir,
    };
    setIsSubmitting(true);
    dispatch(addPriceReport(reportData));
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  // --- 4. REUSABLE STYLES ---
  const navLinkClass = ({ isActive, rounded }) =>
    `flex items-center gap-2 text-[16px] p-2.5 w-fit ${rounded} transition-all duration-200 cursor-pointer ${
      isActive
        ? "text-white bg-[#00C950] font-semibold shadow-md shadow-green-100"
        : "text-gray-600 hover:bg-gray-100 active:scale-95"
    }`;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Navigation />

      <div className="w-full flex flex-col gap-4 p-2 mt-4 lg:mt-0 lg:p-6 md:ml-64 overflow-y-auto ">
        {/* HEADER SECTION */}
        <header className="w-full mb-2">
          <h1 className="text-2xl font-bold text-gray-800">Add Price Report</h1>
          <p className="text-gray-500 text-sm">
            Help {selectedMarket?.title || "the community"} stay updated with
            accurate prices
          </p>
        </header>

        {/* MARKET LOCATION CARD */}
        <section className="relative w-full flex flex-col gap-3 rounded-xl bg-[#00C950]/5 border border-[#00C950]/20 shadow-sm p-4 sm:flex-row sm:items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-[#00C950] p-3 text-white">
              <MapPin size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-800 text-lg">
                  {selectedMarket
                    ? selectedMarket.title
                    : "Detecting Market..."}
                </h3>
                {selectedMarket && (
                  <span className="flex items-center gap-1 text-[10px] bg-white text-[#00C950] px-2 py-0.5 rounded-full border border-[#00C950]">
                    <Check size={10} /> Verified
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-xs">
                {selectedMarket?.location || "Fetching GPS coordinates..."}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsChanging(!isChanging)}
            className="text-[#00C950] font-semibold text-sm hover:underline px-4 py-2 rounded-lg bg-white border border-[#00C950]/20 transition-all"
          >
            {isChanging ? "Cancel" : "Change Market"}
          </button>

          {/* MARKET SELECTOR OVERLAY */}
          {isChanging && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-[100] p-2 animate-in fade-in slide-in-from-top-2">
              <div className="p-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                Nearby Markets
              </div>
              <div className="max-h-60 overflow-y-auto">
                {allMarketsData.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      setSelectedMarket(m);
                      setIsChanging(false);
                    }}
                    className="flex items-center justify-between p-3 hover:bg-[#00C950]/5 rounded-lg cursor-pointer group"
                  >
                    <div>
                      <p className="font-bold text-gray-700 group-hover:text-[#00C950]">
                        {m.title}
                      </p>
                      <p className="text-xs text-gray-400">{m.location}</p>
                    </div>
                    <ChevronRight size={16} className="text-gray-300" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* GPS ALERT */}
        {gpsError && (
          <div className="w-full flex items-center gap-4 rounded-xl bg-amber-50 border border-amber-200 p-4 animate-pulse">
            <div className="rounded-full bg-amber-100 p-2 text-amber-600">
              <TriangleAlert size={20} />
            </div>
            <div>
              <h3 className="font-bold text-amber-800">Weak GPS Signal</h3>
              <p className="text-xs text-amber-700">
                Please confirm your market manually to ensure accuracy.
              </p>
            </div>
          </div>
        )}

        {/* MAIN FORM CONTAINER */}
        <main className="w-full flex flex-col gap-6 border border-gray-200 rounded-2xl bg-white shadow-sm p-4 lg:p-6">
          {/* ITEM SELECTION FLOW */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-[#00C950] rounded-full" />
              1. Select Item
            </h3>

            <div className="relative">
              <SearchIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search items (e.g. Beans)"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00C950] focus:border-transparent outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* CATEGORY TABS */}
            <div className="overflow-x-auto pb-2 custom-scrollbar">
              <ul className="flex gap-2 min-w-max">
                {["Vegetables", "Grains", "Tubers", "Protein", "Oil"].map(
                  (cat) => (
                    <li
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setSelectedItem(null);
                      }}
                      className={navLinkClass({
                        isActive: selectedCategory === cat,
                        rounded: "rounded-full px-6",
                      })}
                    >
                      {cat}
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* DYNAMIC ITEM GRID */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-widest">
                Available in {selectedCategory} ({filteredItems.length})
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 ${
                      selectedItem?.id === item.id
                        ? "bg-white border-[#00C950] shadow-md scale-[1.02]"
                        : "bg-white border-transparent hover:border-gray-200 text-gray-600"
                    }`}
                  >
                    <span
                      className={`text-sm font-medium ${selectedItem?.id === item.id ? "text-[#00C950]" : ""}`}
                    >
                      {item.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t border-gray-100">
            {/* MEASUREMENT & PRICE */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  2. Measure Unit
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Bag",
                    "Basket",
                    "Paint Bucket",
                    "Mudu",
                    "Derica",
                    "KG",
                  ].map((u) => (
                    <button
                      key={u}
                      onClick={() => setUnit(u)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all text-sm font-semibold ${
                        unit === u
                          ? "bg-[#00C950]/10 border-[#00C950] text-[#00C950]"
                          : "bg-white border-gray-100 text-gray-500 hover:border-gray-200"
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  3. Current Price
                </h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-14 h-14 bg-gray-100 rounded-xl text-gray-400 font-bold text-xl">
                    ₦
                  </div>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    className="flex-1 h-14 text-2xl font-bold border-b-2 border-gray-100 focus:border-[#00C950] outline-none transition-all placeholder:text-gray-200"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2 italic">
                  Enter the price per {unit} today.
                </p>
              </div>
            </div>

            {/* PHOTO UPLOAD */}
            <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center min-h-[200px] relative overflow-hidden group">
              {preview ? (
                <div className="absolute inset-0">
                  <img
                    src={preview}
                    className="w-full h-full object-cover"
                    alt="Preview"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setPreview(null)}
                      className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-red-500"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    onClick={handleFileClick}
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 group-hover:text-[#00C950] group-hover:scale-110 transition-all cursor-pointer mb-4"
                  >
                    <Camera size={32} />
                  </div>
                  <p className="text-sm font-bold text-gray-700">
                    Add Photo Proof
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Earn +10 bonus reputation points
                  </p>
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </div>
          </div>
        </main>

        {/* REPUTATION BANNER */}
        <div className="w-full p-4 rounded-xl bg-gradient-to-r from-[#00C950] to-[#00A840] text-white flex items-center justify-between shadow-lg shadow-green-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Star size={20} />
            </div>
            <div>
              <p className="font-bold text-sm">Community Contributor</p>
              <p className="text-[10px] opacity-80 uppercase tracking-widest">
                Verify and earn rewards
              </p>
            </div>
          </div>
          <div className="text-2xl font-black">+10 PTS</div>
        </div>

        {/* FINAL SUBMIT BUTTON */}
        <div className="w-full">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full h-16 rounded-2xl font-bold text-white flex items-center justify-center gap-3 transition-all shadow-xl shadow-green-200 ${
              isSubmitting
                ? "bg-gray-400"
                : "bg-[#00C950] hover:bg-[#00A840] active:scale-[0.98]"
            }`}
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send size={20} />
                Confirm & Submit Report
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePrice;
