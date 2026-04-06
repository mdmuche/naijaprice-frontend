import { createSlice } from "@reduxjs/toolkit";
import { commoditiesData } from "../../utils/CommoditiesData";

/**
 * HELPER: Generates mock historical data for the Chart based on
 * the items actually present in the selected market.
 */
const generateMarketTrends = (commodities, marketName) => {
  const marketItems = commodities
    .filter((item) => item.market === marketName)
    .slice(0, 5); // Limits to 5 items to keep the chart readable

  if (marketItems.length === 0) return [];

  const days = ["Day 1", "Day 10", "Day 20", "Day 30"];

  return days.map((day, index) => {
    const dataPoint = { day };
    marketItems.forEach((item) => {
      // Logic: Simulate a price trend that fluctuates but ends near the current price
      const fluctuation = 1 + Math.sin(index + item.id) * 0.06;
      const key = item.title.toLowerCase();
      dataPoint[key] = Math.round(item.price * fluctuation);
    });
    return dataPoint;
  });
};

const initialState = {
  commodities: commoditiesData,
  activeCategory: "All",
  searchTerm: "",
  sortBy: "latest",
  filterSource: "all",
  currentLocation: {
    state: "Lagos",
    lga: "Kosofe",
    market: "Mile 12 Market",
  },
  trendTimeframe: "30d",
  // Default trends for the first view (Mile 12)
  marketTrends: [
    { day: "Day 1", tomatoes: 42000, rice: 78000, garri: 3200, beans: 6800 },
    { day: "Day 10", tomatoes: 44000, rice: 80000, garri: 3400, beans: 7000 },
    { day: "Day 20", tomatoes: 43000, rice: 81000, garri: 3500, beans: 7100 },
    { day: "Day 30", tomatoes: 45000, rice: 82000, garri: 3500, beans: 7200 },
  ],
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
      // DYNAMIC: Update the chart data whenever the location/market changes
      state.marketTrends = generateMarketTrends(
        state.commodities,
        action.payload.market,
      );
    },
    setTrendTimeframe: (state, action) => {
      state.trendTimeframe = action.payload;
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
} = priceSlice.actions;

export default priceSlice.reducer;
