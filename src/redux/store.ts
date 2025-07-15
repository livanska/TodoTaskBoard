import {
    combineReducers,
    configureStore,
    createListenerMiddleware,
    isAnyOf,
} from "@reduxjs/toolkit";
import tasksReducer, { tasksActions } from "./tasks/reducer";
import columnsReducer, { columnsActions } from "./columns/reducer";
import settingsReducer, {
    setBoardName,
    settingsActions,
} from "./settings/reducer";
import { loadLocalState, saveToLocalState } from "../utils/localStorage";
import {
    convertFromStoreType,
    convertToStoreType,
} from "../utils/convertBoardData";
import { useDispatch, useSelector, useStore } from "react-redux";
import { AppDispatch, RootState, AppStore } from "./types";

const preloadedState = convertToStoreType(loadLocalState());

export const rootReducer = combineReducers({
    settings: settingsReducer,
    columns: columnsReducer,
    tasks: tasksReducer,
});

const listener = createListenerMiddleware();
const matchingActions = [
    setBoardName,
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

export const hydrateStoreFromLocalStorage = () => (dispatch: AppDispatch) => {
    const rawState = loadLocalState();
    if (!rawState) return;

    const converted = convertToStoreType(rawState);

    dispatch(settingsActions.setEntireState(converted.settings));
    dispatch(tasksActions.setEntireState(converted.tasks));
    dispatch(columnsActions.setEntireState(converted.columns));
};

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
