import { configureStore } from "@reduxjs/toolkit";
import priceReducer from "./slices/priceSlice";
import marketReducer from "./slices/marketSlice";
import suggestionReducer from "./slices/suggestionSlice";
import alertsReducer from "./slices/alertSlice";

export const store = configureStore({
  reducer: {
    prices: priceReducer,
    markets: marketReducer,
    suggestions: suggestionReducer,
    alerts: alertsReducer,
  },
});
