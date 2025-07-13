import { RootState } from "../types";

export const columnsOptionsSelector = (state: RootState) =>
    state.columns?.map(({ id, title }) => ({ value: id, label: title }));
