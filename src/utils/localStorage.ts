import { Board } from "../types";

const storeKey = "boardData";

export const saveToLocalState = (state: Board) => {
    try {
        localStorage.setItem(storeKey, JSON.stringify(state));
    } catch (err) {
        console.error("Error saving to local storage:", err);
    }
};

export const loadLocalState = () => {
    try {
        const serializedState = localStorage.getItem(storeKey);
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (err) {
        console.error("Error loading local storage:", err);
        return undefined;
    }
};

export const existInLocalStorage = () =>
    localStorage.getItem(storeKey) !== null;
