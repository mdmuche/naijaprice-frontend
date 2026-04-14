import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getStoredUser } from "../../utils/getUser";

const initialState = {
  profile: getStoredUser(),
  isAuthenticated: !!getStoredUser(),
  isAdmin: getStoredUser()?.role === "admin",
  usersList: JSON.parse(localStorage.getItem("naijaprice_users_db")) || [],
  forgotPasswordStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  authError: null,
};

const SESSION_KEY = "naijaprice_current_session";
const DB_KEY = "naijaprice_users_db";

export const simulatePasswordReset = createAsyncThunk(
  "user/simulatePasswordReset",
  async (email, { rejectWithValue }) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const usersDb = JSON.parse(localStorage.getItem(DB_KEY)) || [];
    const userExists = usersDb.find((u) => u.email === email);

    if (!userExists) {
      return rejectWithValue("No account found with that email address.");
    }
    return true;
  },
);
export const simulateResetSubmit = createAsyncThunk(
  "user/simulateResetSubmit",
  async ({ email, newPassword }, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const usersDb =
        JSON.parse(localStorage.getItem("naijaprice_users_db")) || [];
      const userIndex = usersDb.findIndex((u) => u.email === email);

      if (userIndex === -1) {
        return rejectWithValue("User session expired or not found.");
      }

      // Update password in the "DB"
      usersDb[userIndex].password = newPassword;
      localStorage.setItem("naijaprice_users_db", JSON.stringify(usersDb));

      return true;
    } catch (err) {
      console.error("Error: ", err);
      return rejectWithValue("Failed to update password.");
    }
  },
);

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
    // Clear status when leaving the page
    resetAuthStatus: (state) => {
      state.forgotPasswordStatus = "idle";
      state.authError = null;
    },
    updatePassword: (state, action) => {
      const { email, newPassword } = action.payload;

      // Update the user in the "database"
      state.usersList = state.usersList.map((user) =>
        user.email === email ? { ...user, password: newPassword } : user,
      );

      // Sync to LocalStorage
      localStorage.setItem(
        "naijaprice_users_db",
        JSON.stringify(state.usersList),
      );

      state.forgotPasswordStatus = "idle"; // Reset for next time
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
  extraReducers: (builder) => {
    builder
      .addCase(simulatePasswordReset.pending, (state) => {
        state.forgotPasswordStatus = "loading";
        state.authError = null;
      })
      .addCase(simulatePasswordReset.fulfilled, (state) => {
        state.forgotPasswordStatus = "succeeded";
      })
      .addCase(simulatePasswordReset.rejected, (state, action) => {
        state.forgotPasswordStatus = "failed";
        state.authError = action.payload;
      })
      .addCase(simulateResetSubmit.fulfilled, (state) => {
        state.forgotPasswordStatus = "reset_success";
      });
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
  resetAuthStatus,
  updatePassword,
} = userSlice.actions;

export default userSlice.reducer;
