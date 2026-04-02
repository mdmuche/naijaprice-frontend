import {
  Camera,
  Check,
  CircleAlert,
  MapPin,
  Plus,
  Send,
  Star,
  TriangleAlert,
} from "lucide-react";
import Navigation from "../components/Navigation";
import Search from "../components/Search";
import { useRef, useState } from "react";

function CreatePrice() {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();
  const handleFileClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // console.log("Selected file:", file);
    // Handle file change logic here
    setPreview(URL.createObjectURL(file));
  };
  const navLinkClass = ({ isActive, rounded }) =>
    `flex items-center gap-2 text-[16px] p-2.5 w-fit ${rounded} transition-colors cursor-pointer ${
      isActive
        ? "text-white bg-[#00C950] font-semibold"
        : "text-gray-600 hover:bg-gray-200"
    }`;
  return (
    <div className="flex h-screen">
      <Navigation />
      <div className="w-full flex flex-col gap-4 p-2 lg:p-4 md:ml-64">
        {/* Header */}
        <div className="w-full mx-auto flex items-center">
          <div>
            <h1 className="text-2xl font-bold text-start">Add Price Report</h1>
            <p className="text-gray-600 text-sm text-start">
              Submit current market prices to help the community
            </p>
          </div>
        </div>
        <div className="w-full mx-auto flex gap-2 flex-col items-start rounded-lg bg-[#00C950]/10 shadow-md p-4 sm:flex-row sm:gap-0">
          <div className="w-full flex flex-col lg:items-start gap-4 lg:w-[70%] lg:flex-row">
            <div className="flex flex-col gap-2 items-start">
              <div className="flex gap-2 items-center">
                <div className="rounded-full bg-[#00C950]/20 p-3">
                  <MapPin size={16} />
                </div>
                <h3 className="font-bold lg:text-[20px]">
                  Detected Mile 12 Market Lagos
                </h3>
              </div>

              <div>
                <p className="text-gray-600 text-sm">
                  GPS auto-detected location
                </p>
              </div>
            </div>

            <div className="w-fit flex items-center gap-1 text-green-600 font-bold rounded-lg bg-[#00C950]/10 px-2 py-1">
              <div className="bg-white border-2 border-[#00C950] rounded-full">
                <Check size={16} />
              </div>
              Verified
            </div>
          </div>
          <div className="flex justify-end w-[30%]">
            <button className="bg-[#00C950] text-white px-4 py-2 rounded-md hover:bg-[#00A840]/20 cursor-pointer">
              Change
            </button>
          </div>
        </div>
        <div className="w-full mx-auto flex items-center rounded-[5px] bg-yellow-50 shadow-md p-4">
          <div className="w-full flex items-center gap-4">
            <div className="rounded-full bg-yellow-200 p-3">
              <TriangleAlert className="text-yellow-500" size={16} />
            </div>

            <div>
              <h3 className="font-bold text-[20px] text-yellow-600">
                Low Confidence - GPS Signal weak
              </h3>
              <p className="text-sm text-yellow-400">
                Please verify your market location manually if needed
              </p>
            </div>
          </div>
        </div>
        <div className="w-full mx-auto flex flex-col gap-2 border-2 border-gray-200 rounded-lg bg-white shadow-md p-4">
          <h3 className="font-bold text-[20px]">Select Item</h3>
          <Search placeholder={"Tomatoes (Big Basket)"} angle={true} />
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-gray-200 py-4">
            <ul className="flex flex-wrap gap-2">
              <h4 className="p-2.5 text-gray-600 text-[18px]">Categories:</h4>
              <li
                className={navLinkClass({
                  isActive: true,
                  rounded: "rounded-3xl",
                })}
              >
                Vegetables
              </li>
              <li
                className={navLinkClass({
                  isActive: false,
                  rounded: "rounded-3xl",
                })}
              >
                Grains
              </li>
              <li
                className={navLinkClass({
                  isActive: false,
                  rounded: "rounded-3xl",
                })}
              >
                Tubers
              </li>
              <li
                className={navLinkClass({
                  isActive: false,
                  rounded: "rounded-3xl",
                })}
              >
                Protein
              </li>
              <li
                className={navLinkClass({
                  isActive: false,
                  rounded: "rounded-3xl",
                })}
              >
                Oil
              </li>
            </ul>
          </div>
          <div className="border-b-2 border-gray-200 py-4">
            <h3 className="font-bold text-[20px]">Measure Unit</h3>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-gray-200 py-4">
              <ul className="flex flex-wrap gap-2">
                <li
                  className={navLinkClass({
                    isActive: true,
                    rounded: "rounded-lg",
                  })}
                >
                  Bag
                </li>
                <li
                  className={navLinkClass({
                    isActive: false,
                    rounded: "rounded-lg",
                  })}
                >
                  Basket
                </li>
                <li
                  className={navLinkClass({
                    isActive: false,
                    rounded: "rounded-lg",
                  })}
                >
                  Pain Bucket
                </li>
                <li
                  className={navLinkClass({
                    isActive: false,
                    rounded: "rounded-lg",
                  })}
                >
                  Mudu
                </li>
                <li
                  className={navLinkClass({
                    isActive: false,
                    rounded: "rounded-lg",
                  })}
                >
                  Derica
                </li>
                <li
                  className={navLinkClass({
                    isActive: false,
                    rounded: "rounded-lg",
                  })}
                >
                  KG
                </li>
              </ul>
            </div>
          </div>
          <div className="border-b-2 border-gray-200 py-4 flex flex-col gap-2">
            <h3 className="font-bold text-[20px]">Price (₦)</h3>
            <div className="w-full flex items-center gap-2">
              <div className="font-bold text-[16px] bg-gray-200 text-gray-400 rounded-lg px-4 py-2">
                ₦
              </div>
              <input
                type="number"
                placeholder="Enter price"
                className="w-[60%] border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#00C950] sm:w-[40%]"
              />
            </div>
            <p className="text-gray-600 text-sm">
              Enter the current price per unit at this market
            </p>
          </div>
          <div>
            <h3 className="font-bold text-[20px]">Photo (Optional)</h3>
            <div
              onClick={handleFileClick}
              className="w-fit border-2 border-dashed border-gray-300 bg-gray-200 rounded-full p-3 cursor-pointer flex items-center mt-8 mx-auto"
            >
              <Camera size={16} />
            </div>
            <input
              type="file"
              name="photo"
              id="photo"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png, image/jpeg"
              className="hidden"
            />
            <p className="text-gray-600 text-sm text-center mt-2">
              Click to add a photo
            </p>
            <p className="text-gray-600 text-sm text-center mt-2">
              JPG, PNG up to 5mb
            </p>
            {preview && (
              <img
                src={preview}
                className="w-20 h-20 object-cover mx-auto mt-4 rounded"
              />
            )}
            <div className="flex items-center gap-2 mt-2 rounded-lg p-2 bg-[#00C950]/20 text-[#00C950] w-fit mx-auto cursor-pointer">
              <Star size={16} />
              <span className="text-sm flex items-center">
                <Plus size={16} />
                10 Reps Points
              </span>
            </div>
          </div>
        </div>
        <div className="w-full mx-auto flex items-center rounded-lg bg-[#00C950]/10 shadow-md p-4">
          <div className="w-full flex items-center gap-4">
            <div className="rounded-full bg-[#00C950]/20 p-3">
              <CircleAlert className="text-[#00C950]" size={16} />
            </div>

            <div>
              <h3 className="font-bold text-[20px]">
                Your Submission helps the community!
              </h3>
              <p className="text-gray-600 text-sm">
                Accurate reports earn reputation points and helps traders make
                better decisions
              </p>
            </div>
          </div>
        </div>
        <div className="w-full mx-auto">
          <button className="w-full bg-[#00C950] text-white px-4 py-2 rounded-md hover:bg-[#00A840]/20 cursor-pointer flex items-center justify-center gap-2">
            <Send className="inline mr-2" />
            Submit Price
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePrice;
