import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../types";

export const isModalOpenSelector = (state: RootState) =>
    state.settings.isModalOpen;

export const selectModeSelector = (state: RootState) => ({
    isSelectMode: state.settings.isSelectMode,
    selectedIds: state.settings.selectedIds,
});

export const selectedIdsSelector = (state: RootState) =>
    state.settings.selectedIds;

export const isSelectedIdSelector = (id: string) =>
    createSelector([selectedIdsSelector], (tasks) => tasks?.includes(id));

export const searchSelector = (state: RootState) => state.settings.search;
export const filtersSelector = (state: RootState) => state.settings.filters;

export const boardNameSelector = (state: RootState) => state.settings.name;
