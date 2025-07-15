import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../types";
import { columnsSelector } from "./reducer";

export const columnsAllSelector = () =>
    createSelector([columnsSelector], (columns) =>
        [...columns]?.sort((a, b) => a.order - b.order)
    );

export const columnsOptionsSelector = (state: RootState) =>
    state.columns?.map(({ id, title }) => ({ value: id, label: title }));

export const hasColumnsSelector = (state: RootState) =>
    state.columns?.length > 0;
