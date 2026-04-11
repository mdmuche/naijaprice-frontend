import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_ALERTS } from "../../utils/alertsData";

const alertsSlice = createSlice({
  name: "alerts",
  initialState: {
    allAlerts: INITIAL_ALERTS,
  },
  reducers: {
    addAlert: (state, action) => {
      // Logic: adds new alert to the top of the array
      state.allAlerts.unshift(action.payload);
      localStorage.setItem(
        "naijaprice_alerts",
        JSON.stringify(state.allAlerts),
      );
    },
  },
});

export const { addAlert } = alertsSlice.actions;
export default alertsSlice.reducer;
