import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../types";

export const isModalOpenSelector = (state: RootState) =>
    state.settings.isModalOpen;

export const isSelectModeSelector = (state: RootState) =>
    state.settings.isSelectMode;

export const selectedIdsSelector = (state: RootState) =>
    state.settings.selectedIds;

export const isSelectedIdSelector = (id: string) =>
    createSelector([selectedIdsSelector], (tasks) => tasks?.includes(id));
