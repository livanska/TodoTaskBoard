import { RootState, TaskStoreType } from "../redux/types";
import { Board, Task } from "../types";

export const convertToStoreType = (board: Board): RootState => {
    let allTasks: TaskStoreType[] = [];
    console.log(board);

    const columns = board?.columns?.map(({ id, title, tasks }) => {
        allTasks.push(
            ...tasks.map((task) => ({ ...task, columnId: id, id: task.id }))
        );
        return { id, title };
    });

    console.log(allTasks, columns);

    return { columns, tasks: allTasks };
};

export const convertFromStoreType = (state: RootState) => {
    const groupedTasks = state.tasks.reduce<Record<string, Task[]>>(
        (acc, { columnId, ...task }) => {
            acc[columnId] = [...(acc[columnId] ?? []), task];
            return acc;
        },
        {}
    );

    return {
        columns: state.columns.map((column) => ({
            ...column,
            tasks: groupedTasks[column.id] ?? [],
        })),
    };
};
