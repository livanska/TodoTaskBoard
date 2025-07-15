import { RootState, TaskStoreType } from "../redux/types";
import { Board, Task } from "../types";

type BoardStoreType = { settings: { name: string } } & Omit<
    RootState,
    "settings"
>;

export const convertToStoreType = (board: Board): BoardStoreType => {
    let allTasks: TaskStoreType[] = [];

    const columns = board?.columns?.map(({ id, title, tasks, order }) => {
        allTasks.push(
            ...tasks.map((task) => ({ ...task, columnId: id, id: task.id }))
        );
        return { id, title, order };
    });
    return { columns, tasks: allTasks, settings: { name: board?.name } };
};

export const convertFromStoreType = (state: BoardStoreType) => {
    const groupedTasks = state.tasks.reduce<Record<string, Task[]>>(
        (acc, { columnId, ...task }) => {
            acc[columnId] = [...(acc[columnId] ?? []), task];
            return acc;
        },
        {}
    );

    return {
        name: state.settings.name,
        columns: state.columns.map((column) => ({
            ...column,
            tasks: groupedTasks[column.id] ?? [],
        })),
    };
};
