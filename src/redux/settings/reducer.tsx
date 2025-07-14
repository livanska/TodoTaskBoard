import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    FiltersPayload,
    RootState,
    SetSelectedIdsPayload,
    SettingsStoreType,
} from "../types";

const initialState: SettingsStoreType = {
    isModalOpen: false,
    isSelectMode: false,
    selectedIds: [],
    filters: { done: true, unDone: true },
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
            state.selectedIds = [];
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
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setFilters: (state, action: PayloadAction<FiltersPayload>) => {
            state.filters = action.payload;
        },
    },
});

export const {
    setIsModalOpen,
    setSelectMode,
    setSelectedIds,
    resetSelectedIds,
    setSearch,
    setFilters,
} = settingsSlice.actions;

export const settingsSelector = (state: RootState) => state.settings;

export default settingsSlice.reducer;
