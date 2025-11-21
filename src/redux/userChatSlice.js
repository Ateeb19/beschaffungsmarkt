// src/redux/userChatSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch Chat Data
export const fetchUserChats = createAsyncThunk(
  "get/userchats",
  async (_, { rejectWithValue }) => {
    try {
      const Backend_URL = process.env.REACT_APP_API_URL;

      const res = await axios.get(`${Backend_URL}/api/chats`, {
        withCredentials: true,
      });
      return res.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data || "Unable to fetch chats");
    }
  }
);

const userChatSlice = createSlice({
  name: "user_chat",
  initialState: {
    chatData: null,
    requestStatus: "idle",
    requestId: null,
    error: null,
  },
  reducers: {
    clearChats: (state) => {
      state.chatData = null;
      state.requestStatus = "idle";
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserChats.pending, (state, action) => {
        state.requestStatus = "pending";
        state.requestId = action.meta.requestId;
      })
      .addCase(fetchUserChats.fulfilled, (state, action) => {
        state.requestStatus = "fulfilled";
        state.requestId = action.meta.requestId;

        state.chatData = {
          type: "get/userchats/fulfilled",
          ...action.payload,
          requestId: action.meta.requestId,
          requestStatus: "fulfilled",
        };
      })
      .addCase(fetchUserChats.rejected, (state, action) => {
        state.requestStatus = "rejected";
        state.error = action.payload;
      });
  },
});

export const { clearChats } = userChatSlice.actions;
export default userChatSlice.reducer;
