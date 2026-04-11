import { createSlice } from "@reduxjs/toolkit";
import { commoditiesData } from "../../utils/CommoditiesData";
import { timeAgo } from "../../utils/timeAgo";
import { allMarketsData } from "../../utils/marketData";

/**
 * Calculates the straight-line distance between two GPS coordinates in kilometers.
 * Uses the Haversine formula for high accuracy on a spherical surface.
 */
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers

  // Convert degrees to radians
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  // Return formatted string for UI (e.g., "5.4")
  return distance.toFixed(1);
};

export const getProcessedMarkets = (markets) => {
  return markets.map((market) => {
    // 1. Get all commodities for THIS market
    const marketItems = commoditiesData.filter(
      (item) => item.market === market.title,
    );

    // 2. Find the latest 'createdAt' date
    // We convert to timestamps to compare easily
    const latestDate =
      marketItems.length > 0
        ? new Date(
            Math.max(...marketItems.map((item) => new Date(item.createdAt))),
          )
        : null;

    return {
      ...market,
      reports: marketItems.length, // Dynamic report count
      updatedAt: latestDate ? timeAgo(latestDate) : "No updates", // Dynamic time ago
    };
  });
};

const initialMarkets = allMarketsData.map((market) => {
  const marketItems = commoditiesData.filter((c) => c.market === market.title);

  // Find the newest date string
  const latestTimestamp = marketItems.reduce((latest, item) => {
    return !latest || new Date(item.createdAt) > new Date(latest)
      ? item.createdAt
      : latest;
  }, null);

  return {
    ...market,
    reports: marketItems.length,
    lastUpdated: latestTimestamp ? timeAgo(latestTimestamp) : "N/A",
  };
});
const savedMarkets = JSON.parse(localStorage.getItem("approved_markets")) || [];
const combinedMarkets = [...initialMarkets, ...savedMarkets];
const marketSlice = createSlice({
  name: "markets",
  initialState: {
    allMarkets: combinedMarkets,
    filteredMarkets: [],
    userLocation: null,
    searchLocation: null,
    searchQuery: "",
    filterStatus: "all",
  },
  reducers: {
    sortMarkets: (state, action) => {
      const type = action.payload; // 'distance' or 'name'

      if (type === "name") {
        state.filteredMarkets.sort((a, b) => a.title.localeCompare(b.title));
      } else if (type === "distance") {
        state.filteredMarkets.sort(
          (a, b) => (a.rawDist || 0) - (b.rawDist || 0),
        );
      }
    },
    setSearchQuery: (state, action) => {
      const query = action.payload.toLowerCase();
      state.searchQuery = query;

      const matched = state.allMarkets.filter(
        (m) =>
          m.title.toLowerCase().includes(query) ||
          m.location.toLowerCase().includes(query),
      );

      // If we found matches, pick the first one to represent the "Active Search Location"
      if (matched.length > 0 && query.length > 2) {
        state.searchLocation = {
          lat: matched[0].coords[0],
          lng: matched[0].coords[1],
          name: matched[0].location, // e.g., "Wuse, Abuja"
        };
      } else {
        state.searchLocation = null;
      }

      state.filteredMarkets = matched.map((m) => {
        // Use searchLocation if available, otherwise use GPS userLocation
        const activeLoc = state.searchLocation || state.userLocation;
        if (activeLoc) {
          const d = calculateDistance(
            activeLoc.lat,
            activeLoc.lng,
            m.coords[0],
            m.coords[1],
          );
          return { ...m, distance: `${d} km away`, rawDist: parseFloat(d) };
        }
        return m;
      });
    },
    updateNearbyMarkets: (state, action) => {
      const { lat, lng } = action.payload;
      state.userLocation = { lat, lng };

      // Calculate distance for EVERYTHING in the database
      state.filteredMarkets = state.allMarkets
        .filter((m) => m && m.coords)
        .map((m) => {
          const d = calculateDistance(lat, lng, m.coords[0], m.coords[1]);
          return { ...m, distance: `${d} km away`, rawDist: parseFloat(d) };
        })
        .sort((a, b) => a.rawDist - b.rawDist) // Closest to user first
        .slice(0, 5); // Only show the 5 nearest
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;

      // Re-apply filters based on the new status
      const baseList = state.searchQuery
        ? state.allMarkets.filter((m) =>
            m.title.toLowerCase().includes(state.searchQuery),
          )
        : state.allMarkets;

      state.filteredMarkets = baseList.filter((m) => {
        if (state.filterStatus === "all") return true;
        return m.status === state.filterStatus;
      });

      // Re-calculate distances for the new filtered set
      if (state.userLocation) {
        state.filteredMarkets = state.filteredMarkets
          .map((m) => {
            const d = calculateDistance(
              state.userLocation.lat,
              state.userLocation.lng,
              m.coords[0],
              m.coords[1],
            );
            return { ...m, distance: `${d} km away`, rawDist: parseFloat(d) };
          })
          .sort((a, b) => a.rawDist - b.rawDist);
      }
    }, // Action to add a newly approved market
    approveNewMarket: (state, action) => {
      // 1. Create the new market object
      const approvedMarket = {
        ...action.payload,
        status: "active",
        isCustom: true, // IMPORTANT: Mark this so we know it belongs in LocalStorage
        id: `custom-${Date.now()}`, // Use a unique ID to avoid collisions
      };

      // 2. Add to the Redux state immediately
      state.allMarkets.unshift(approvedMarket);

      // 3. PERSIST to a specific key for APPROVED markets
      // We only filter for 'isCustom' so we don't save the 100+ static markets again
      const customMarkets = state.allMarkets.filter((m) => m.isCustom);

      localStorage.setItem("approved_markets", JSON.stringify(customMarkets));
    },
  },
});

export const {
  sortMarkets,
  setSearchQuery,
  updateNearbyMarkets,
  setFilterStatus,
  approveNewMarket,
} = marketSlice.actions;
export default marketSlice.reducer;
