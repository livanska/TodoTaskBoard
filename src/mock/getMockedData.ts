import { Board } from "../types";
import { getUuid } from "../utils/getUuid";
import mockedData from "./board.json";

export const getMockedData = (): Board => ({
    columns: mockedData.columns?.map((column) => ({
        ...column,
        id: getUuid(),
        tasks: column.tasks?.map((task) => ({ ...task, id: getUuid() })),
    })),
});
