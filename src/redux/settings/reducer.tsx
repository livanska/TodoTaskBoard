import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, SettingsStoreType } from "../types";

const initialState: SettingsStoreType = { isModalOpen: false };

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setIsModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isModalOpen = action.payload;
        },
    },
});

export const { setIsModalOpen } = settingsSlice.actions;

export const settingsSelector = (state: RootState) => state.settings;

export default settingsSlice.reducer;
