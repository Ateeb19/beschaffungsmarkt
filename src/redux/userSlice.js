import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get user info after login
export const fetchUserInfo = createAsyncThunk(
  "get/userinfo",
  async (_, { rejectWithValue }) => {
    try {
        const url = process.env.REACT_APP_API_URL;
      const token = localStorage.getItem("procurement_token");
      if (!token) throw new Error("No token found");

      const res = await axios.get(`${url}/users/getuserinfo`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      return res.data; // backend response: user object
    } catch (err) {
      return rejectWithValue(err.response?.data || "Unable to fetch user info");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    requestId: null,
    requestStatus: "idle",
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.data = null;
      state.requestId = null;
      state.requestStatus = "idle";
      state.error = null;
      localStorage.removeItem("procurement_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state, action) => {
        state.requestStatus = "pending";
        state.requestId = action.meta.requestId;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.requestStatus = "fulfilled";
        state.requestId = action.meta.requestId;
        state.data = {
          type: "get/userinfo/fulfilled",
          ...action.payload, // all user fields
          requestId: action.meta.requestId,
          requestStatus: "fulfilled",
        };
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.requestStatus = "rejected";
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
