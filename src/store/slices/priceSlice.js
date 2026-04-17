import { createSlice } from "@reduxjs/toolkit";
import { commoditiesData } from "../../utils/CommoditiesData";
import { generateTrendsFromHistory } from "../../utils/trendUtils";
import { priceHistory } from "../../utils/priceHistoryData";

/**
 * HELPER: Generates mock historical data for the Chart based on
 * the items actually present in the selected market.
 */
// const generateMarketTrends = (commodities, marketName) => {
//   const marketItems = commodities
//     .filter((item) => item.market === marketName)
//     .slice(0, 5); // Limits to 5 items to keep the chart readable

//   if (marketItems.length === 0) return [];

//   const days = ["Day 1", "Day 10", "Day 20", "Day 30"];

//   return days.map((day, index) => {
//     const dataPoint = { day };
//     marketItems.forEach((item) => {
//       // Logic: Simulate a price trend that fluctuates but ends near the current price
//       const fluctuation = 1 + Math.sin(index + item.id) * 0.06;
//       const key = item.title.toLowerCase();
//       dataPoint[key] = Math.round(item.price * fluctuation);
//     });
//     return dataPoint;
//   });
// };

const getInitialCommodities = () => {
  const savedReports = localStorage.getItem("naijaprice_commodities");
  const parsedReports = savedReports ? JSON.parse(savedReports) : [];

  /** * We spread parsedReports first so that user-added items
   * appear at the top, followed by the default commoditiesData.
   */
  return [...parsedReports, ...commoditiesData];
};

const initialState = {
  commodities: getInitialCommodities(),
  activeCategory: "All",
  searchTerm: "",
  sortBy: "latest",
  filterSource: "all",
  currentLocation: {
    id: 1,
    state: "Lagos",
    lga: "Kosofe",
    market: "Mile 12 Market",
  },
  trendTimeframe: "30d",
  // Default trends for the first view (Mile 12)
  marketTrends: generateTrendsFromHistory(
    priceHistory,
    "Mile 12 Market",
    "30d",
  ),
};

const priceSlice = createSlice({
  name: "prices",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setFilterSource: (state, action) => {
      state.filterSource = action.payload;
    },
    setLocation: (state, action) => {
      state.currentLocation = action.payload;

      state.marketTrends = generateTrendsFromHistory(
        priceHistory,
        action.payload.market,
        state.trendTimeframe,
      );
    },
    addPriceReport: (state, action) => {
      // unshift adds it to the very beginning of the array
      // so it shows up as the "Latest" reportconst newReport = {
      const newReport = {
        ...action.payload,
        status: "pending",
        source: "crowdsourced",
        createdAt: new Date().toISOString(),
      };
      state.commodities.unshift(newReport);
      const userReportsOnly = state.commodities.filter((item) => item.userId);

      localStorage.setItem(
        "naijaprice_commodities",
        JSON.stringify(userReportsOnly),
      );
    },
    verifyPriceReport: (state, action) => {
      const reportId = action.payload;
      const report = state.commodities.find((c) => c.id === reportId);
      if (report) {
        report.status = "approved";
        report.source = "verified";
      }
      // Update LocalStorage
      const userReportsOnly = state.commodities.filter((item) => item.userId);
      localStorage.setItem(
        "naijaprice_commodities",
        JSON.stringify(userReportsOnly),
      );
    },
    rejectPriceReport: (state, action) => {
      const reportId = action.payload;
      state.commodities = state.commodities.filter((c) => c.id !== reportId);

      // Update LocalStorage
      const userReportsOnly = state.commodities.filter((item) => item.userId);
      localStorage.setItem(
        "naijaprice_commodities",
        JSON.stringify(userReportsOnly),
      );
    },
    setTrendTimeframe: (state, action) => {
      state.trendTimeframe = action.payload;

      state.marketTrends = generateTrendsFromHistory(
        priceHistory,
        state.currentLocation.market,
        action.payload,
      );
    },
  },
});

export const {
  setCategory,
  setSearchTerm,
  setSortBy,
  setFilterSource,
  setLocation,
  setTrendTimeframe,
  addPriceReport,
  verifyPriceReport,
  rejectPriceReport,
} = priceSlice.actions;

export default priceSlice.reducer;
