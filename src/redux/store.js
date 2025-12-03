import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import userChatReducer from "./userChatSlice";
import Close_droper from "./Close_droper";
export const store = configureStore({
  reducer: {
    droper_open: Close_droper,
    user: userReducer,
    user_chat: userChatReducer,
  },
});