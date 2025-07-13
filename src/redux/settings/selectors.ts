import { RootState } from "../types";

export const isModalOpenSelector = (state: RootState) =>
    state.settings.isModalOpen;
