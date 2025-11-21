import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import userChatReducer from "./userChatSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    user_chat: userChatReducer,
  },
});