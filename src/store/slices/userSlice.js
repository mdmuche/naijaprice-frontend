import { createSlice } from "@reduxjs/toolkit";
import { getStoredUser } from "../../utils/getUser";

const initialState = {
  profile: getStoredUser(),
  isAuthenticated: !!getStoredUser(),
  isAdmin: getStoredUser()?.role === "admin",
  usersList: JSON.parse(localStorage.getItem("naijaprice_users_db")) || [],
};

const SESSION_KEY = "naijaprice_current_session";
const DB_KEY = "naijaprice_users_db";

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const newUser = {
        ...action.payload,
        id: `user_${Date.now()}`,
        profilePic: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
        isVerifiedUser: false,
        points: 0,
        role:
          action.payload.email === "admin@naijaprice.com" ? "admin" : "user",
      };

      const usersDb = JSON.parse(localStorage.getItem(DB_KEY)) || [];
      usersDb.push(newUser);

      localStorage.setItem(DB_KEY, JSON.stringify(usersDb));
      localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));

      localStorage.setItem("naijaprice_user_token", "active_session_token");

      state.profile = newUser;
      state.isAuthenticated = true;
      state.isAdmin = newUser.role === "admin";
    },

    loginUser: (state, action) => {
      state.profile = action.payload;
      state.isAuthenticated = true;

      state.isAdmin = action.payload.role === "admin";

      localStorage.setItem(SESSION_KEY, JSON.stringify(action.payload));
      localStorage.setItem("naijaprice_user_token", "active_session_token");
    },
    simulateAdminLogin: (state) => {
      const adminUser = {
        id: "admin_001",
        name: "System Admin",
        email: "admin@naijaprice.com",
        role: "admin", // This is the key
        profilePic: "https://cdn-icons-png.flaticon.com/512/608/608994.png",
      };

      state.profile = adminUser;
      state.isAuthenticated = true;
      state.isAdmin = true;

      localStorage.setItem(SESSION_KEY, JSON.stringify(adminUser));
      localStorage.setItem("naijaprice_user_token", "admin_session_token");
    },

    setUserInfo: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };

      // Update Session
      localStorage.setItem(SESSION_KEY, JSON.stringify(state.profile));

      // Update Database so changes persist after logout
      const usersDb = JSON.parse(localStorage.getItem(DB_KEY)) || [];
      const updatedDb = usersDb.map((u) =>
        u.id === state.profile.id ? state.profile : u,
      );
      localStorage.setItem(DB_KEY, JSON.stringify(updatedDb));
    },
    togglePreferredMarket: (state, action) => {
      const marketId = action.payload;
      if (!state.profile.preferredMarkets) {
        state.profile.preferredMarkets = [];
      }

      const index = state.profile.preferredMarkets.indexOf(marketId);
      if (index === -1) {
        state.profile.preferredMarkets.push(marketId); // Add if not there
      } else {
        state.profile.preferredMarkets.splice(index, 1); // Remove if already there
      }

      // Persist the change to the "DB" and session
      localStorage.setItem(
        "naijaprice_current_session",
        JSON.stringify(state.profile),
      );
      // Update permanent Users DB
      const users = JSON.parse(
        localStorage.getItem("naijaprice_users") || "[]",
      );
      const updatedUsers = users.map((u) =>
        u.id === state.profile.id
          ? { ...u, preferredMarkets: state.profile.preferredMarkets }
          : u,
      );
      localStorage.setItem("naijaprice_users", JSON.stringify(updatedUsers));
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
      localStorage.setItem("userProfile", JSON.stringify(state.profile));
    },

    updateProfilePic: (state, action) => {
      state.profile.profilePic = action.payload;

      // Update Session
      localStorage.setItem(SESSION_KEY, JSON.stringify(state.profile));

      // Update Database
      const usersDb = JSON.parse(localStorage.getItem(DB_KEY)) || [];
      const updatedDb = usersDb.map((u) =>
        u.id === state.profile.id ? state.profile : u,
      );
      localStorage.setItem(DB_KEY, JSON.stringify(updatedDb));
    },

    verifyUserAsScout: (state, action) => {
      const userId = action.payload;
      state.usersList = state.usersList.map((user) =>
        user.id === userId
          ? { ...user, isVerifiedUser: true, role: "scout" }
          : user,
      );
      const DB_KEY = "naijaprice_users_db";
      localStorage.setItem(DB_KEY, JSON.stringify(state.usersList));
    },
    logoutUser: (state) => {
      state.profile = null;
      state.isAuthenticated = false;
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem("naijaprice_user_token");
    },
  },
});

export const {
  setUserInfo,
  updateProfilePic,
  logoutUser,
  registerUser,
  loginUser,
  verifyUserAsScout,
  togglePreferredMarket,
} = userSlice.actions;

export default userSlice.reducer;
