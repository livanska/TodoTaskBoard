import {
    combineReducers,
    configureStore,
    createListenerMiddleware,
    isAnyOf,
} from "@reduxjs/toolkit";
import tasksReducer, { tasksActions } from "./tasks/reducer";
import columnsReducer, { columnsActions } from "./columns/reducer";
import settingsReducer from "./settings/reducer";
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
import { getMockedData } from "../mock/getMockedData";

const preloadedState = convertToStoreType(
    existInLocalStorage() ? loadLocalState() : getMockedData()
);

export const rootReducer = combineReducers({
    settings: settingsReducer,
    columns: columnsReducer,
    tasks: tasksReducer,
});

const listener = createListenerMiddleware();
const matchingActions = [
    ...(Object.values(tasksActions) as Array<
        (typeof tasksActions)[keyof typeof tasksActions]
    >),
    ...(Object.values(columnsActions) as Array<
        (typeof columnsActions)[keyof typeof columnsActions]
    >),
];

listener.startListening({
    matcher: isAnyOf(...matchingActions),
    effect: async (_, listenerApi) => {
        saveToLocalState(
            convertFromStoreType(listenerApi.getState() as RootState)
        );
    },
});

export const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listener.middleware),
});

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
