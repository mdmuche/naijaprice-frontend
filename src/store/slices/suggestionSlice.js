import { createSlice } from "@reduxjs/toolkit";

const suggestionSlice = createSlice({
  name: "suggestions",
  initialState: { pendingMarkets: [] },
  reducers: {
    addMarketSuggestion: (state, action) => {
      state.pendingMarkets.unshift(action.payload);
      localStorage.setItem(
        "pending_markets",
        JSON.stringify(state.pendingMarkets),
      );
    },
    // Remove the suggestion after approval
    removeSuggestion: (state, action) => {
      state.pendingMarkets = state.pendingMarkets.filter(
        (m) => m.id !== action.payload,
      );
    },
  },
});

export const { addMarketSuggestion, removeSuggestion } =
  suggestionSlice.actions;
export default suggestionSlice.reducer;
