import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, SetSelectedIdsPayload, SettingsStoreType } from "../types";

const initialState: SettingsStoreType = {
    isModalOpen: false,
    isSelectMode: false,
    selectedIds: [],
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setIsModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isModalOpen = action.payload;
        },
        setSelectMode: (state, action: PayloadAction<boolean>) => {
            state.isSelectMode = action.payload;
        },
        setSelectedIds: (
            state,
            action: PayloadAction<SetSelectedIdsPayload>
        ) => {
            const { ids, isSelected } = action.payload;
            if (isSelected) state.selectedIds?.push(...ids);
            else
                state.selectedIds = state.selectedIds?.filter(
                    (id) => !ids.includes(id)
                );
        },
        resetSelectedIds: (state) => {
            state.selectedIds = [];
        },
    },
});

export const {
    setIsModalOpen,
    setSelectMode,
    setSelectedIds,
    resetSelectedIds,
} = settingsSlice.actions;

export const settingsSelector = (state: RootState) => state.settings;

export default settingsSlice.reducer;
