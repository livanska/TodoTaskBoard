import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasks/reducer";
import columnsReducer from "./columns/reducer";
import {
    existInLocalStorage,
    loadLocalState,
    saveToLocalState,
} from "../utils/localStorage";
import {
    convertFromStoreType,
    convertToStoreType,
} from "../utils/convertBoardData";
import { useDispatch, useSelector, useStore } from "react-redux";
import { AppDispatch, RootState, AppStore } from "./types";
import mockedData from "../mock/board.json";

const preloadedState = existInLocalStorage()
    ? convertToStoreType(loadLocalState())
    : convertToStoreType(mockedData);

export const rootReducer = combineReducers({
    columns: columnsReducer,
    tasks: tasksReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    preloadedState, // Load state from LocalStorage
});

// Save to localStorage every time the state changes
store.subscribe(() => {
    saveToLocalState(convertFromStoreType(store.getState()));
});

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
