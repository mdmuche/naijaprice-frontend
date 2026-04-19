import { createSlice } from "@reduxjs/toolkit";
import { commoditiesData } from "../../utils/CommoditiesData";
import { generateTrendsFromHistory } from "../../utils/trendUtils";
import { priceHistory } from "../../utils/priceHistoryData";
import { initialReports } from "../../utils/initialData";

const DB_KEY = "naijaprice_commodities";

const getInitialCommodities = () => {
  const savedReports = localStorage.getItem(DB_KEY);
  const parsedReports = savedReports ? JSON.parse(savedReports) : [];

  // Combine LocalStorage reports and Default Data
  const combined = [...parsedReports, ...initialReports, ...commoditiesData];

  // deduplicate by ID: This ensures that if an item is in both,
  // it only appears once.
  const uniqueCommodities = Array.from(
    new Map(combined.map((item) => [item.id, item])).values(),
  );

  return uniqueCommodities;
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
        id: action.payload.id || Date.now(),
        status: "pending",
        source: "crowdsourced",
        createdAt: new Date().toISOString(),
      };
      state.commodities.unshift(newReport);

      const userReportsOnly = state.commodities.filter((item) => item.userId);
      localStorage.setItem(DB_KEY, JSON.stringify(userReportsOnly));
    },
    verifyPriceReport: (state, action) => {
      const reportId = action.payload;
      const report = state.commodities.find((c) => c.id === reportId);
      if (report) {
        report.status = "verified";
        report.source = "verified";
      }
      // Update LocalStorage
      const userReportsOnly = state.commodities.filter(
        (item) => item.userId && item.source !== "initial",
      );

      localStorage.setItem(DB_KEY, JSON.stringify(userReportsOnly));
    },
    rejectPriceReport: (state, action) => {
      const reportId = action.payload;
      state.commodities = state.commodities.filter((c) => c.id !== reportId);

      // Update LocalStorage
      const userReportsOnly = state.commodities.filter((item) => item.userId);
      localStorage.setItem(DB_KEY, JSON.stringify(userReportsOnly));
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
