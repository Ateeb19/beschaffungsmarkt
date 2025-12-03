import { createSlice } from "@reduxjs/toolkit";

const Close_droper = createSlice({
    name: "droper_open",
    initialState: {
        selected: false,
    },
    reducers: {
        setDroper_open : (state, action) => {
            state.selected = action.payload;
        }
    }
});

export const {setDroper_open} = Close_droper.actions;
export default Close_droper.reducer;