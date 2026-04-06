import { createSlice } from "@reduxjs/toolkit";
import { commoditiesData } from "../../utils/CommoditiesData";
import { timeAgo } from "../../utils/timeAgo";

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

const allMarketsData = [
  // LAGOS AREA
  {
    id: 1,
    title: "Mile 12 Market",
    location: "Kosofe, Lagos",
    coords: [6.6018, 3.3875],
    status: "active",
  },
  {
    id: 2,
    title: "Oyingbo Market",
    location: "Ebute Metta, Lagos",
    coords: [6.4698, 3.3852],
    status: "active",
  },
  {
    id: 3,
    title: "Computer Village",
    location: "Ikeja, Lagos",
    coords: [6.5966, 3.337],
    status: "active",
  },
  {
    id: 4,
    title: "Balogun Market",
    location: "Lagos Island",
    coords: [6.4549, 3.3884],
    status: "active",
  },
  {
    id: 5,
    title: "Mushin Market",
    location: "Mushin, Lagos",
    coords: [6.5312, 3.3421],
    status: "active",
  },
  {
    id: 6,
    title: "Alaba International",
    location: "Ojo, Lagos",
    coords: [6.4633, 3.1901],
    status: "quiet",
  },

  // ABEOKUTA / OGUN
  {
    id: 7,
    title: "Kuto Market",
    location: "Abeokuta, Ogun",
    coords: [7.1475, 3.3614],
    status: "active",
  },

  // IBADAN AREA
  {
    id: 8,
    title: "Bodija Market",
    location: "Ibadan North, Oyo",
    coords: [7.435, 3.9143],
    status: "active",
  },
  {
    id: 9,
    title: "Dugbe Market",
    location: "Ibadan NW, Oyo",
    coords: [7.3875, 3.8764],
    status: "active",
  },

  // ABUJA AREA
  {
    id: 10,
    title: "Wuse Market",
    location: "Wuse, Abuja",
    coords: [9.0611, 7.458],
    status: "active",
  },
  {
    id: 11,
    title: "Garki Model Market",
    location: "Garki, Abuja",
    coords: [9.0333, 7.4833],
    status: "active",
  },
  {
    id: 12,
    title: "Utako Market",
    location: "Utako, Abuja",
    coords: [9.0667, 7.4333],
    status: "active",
  },
];

const marketSlice = createSlice({
  name: "markets",
  initialState: {
    allMarkets: allMarketsData.map((market) => {
      const marketItems = commoditiesData.filter(
        (c) => c.market === market.title,
      );

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
    }),
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
    },
  },
});

export const {
  sortMarkets,
  setSearchQuery,
  updateNearbyMarkets,
  setFilterStatus,
} = marketSlice.actions;
export default marketSlice.reducer;
