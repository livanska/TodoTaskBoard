import React, { useCallback, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import COLORS from "../../styles/colors";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { tasksByColumnIdSelector } from "../../redux/tasks/selectors";
import { addTask, editTask, moveTask } from "../../redux/tasks/reducer";
import SPACINGS from "../../styles/spacings";
import {
    ColumnEditPayload,
    ColumnStoreType,
    TaskCreatePayload,
    TaskEditPayload,
} from "../../redux/types";
import Task from "../Task";
import Icon from "../Icon";
import { deleteColumn, editColumn } from "../../redux/columns/reducer";
import {
    draggable,
    dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { ColumnDraggable, TaskDraggable } from "../../types";
import {
    filtersSelector,
    searchSelector,
    selectModeSelector,
} from "../../redux/settings/selectors";
import { setSelectedIds } from "../../redux/settings/reducer";
import { ModalEntityProps } from "../EntityModal/types";
import { matchSearch } from "../../utils/searchText";
import FONT_STYLES from "../../styles/fontStyles";

const Root = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    background-color: ${COLORS.background};
    border: 1px solid ${COLORS.border};
    border-radius: ${SPACINGS.xs};
    min-width: 15rem;
    max-width: 20rem;
    width: 100%;
    overflow: hidden;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${SPACINGS.xs};
    padding: 0 ${SPACINGS.sm} ${SPACINGS.sm};
    overflow-y: scroll;
    height: 100%;
    width: 100%;
`;

const Title = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    padding-left: ${SPACINGS.xs};
    ${FONT_STYLES.subtitle};
`;

const Header = styled.div`
    padding: ${SPACINGS.sm} ${SPACINGS.sm} ${SPACINGS.xs};
    color: ${COLORS.title};
    font-weight: bold;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-self: center;
`;

const Row = styled.div<{ alignEnd?: boolean }>`
    display: flex;
    gap: ${SPACINGS.xs};
    justify-content: space-between;
    align-items: center;
    ${FONT_STYLES.subtitle}
    ${({ alignEnd }) => alignEnd && ` align-self: flex-end;`}
`;

const DragIconWrapper = styled.div<{ isSelectMode?: boolean }>`
    display: flex;
    align-self: start;
    cursor: pointer;
    margin-right: ${SPACINGS.sm};
    ${({ isSelectMode }) => isSelectMode && `display: none;`}
`;

const Col = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

type Props = {
    openModal: (props: ModalEntityProps) => void;
} & ColumnStoreType;

const Column: React.FC<Props> = ({ id, title, order, openModal }) => {
    const filters = useAppSelector(filtersSelector);
    const search = useAppSelector(searchSelector);
    const tasks = useAppSelector((s) => tasksByColumnIdSelector(s, id));
    const { isSelectMode } = useAppSelector(selectModeSelector);
    const dispatch = useAppDispatch();

    const handleDeleteColumn = useCallback(
        () => dispatch(deleteColumn(id)),
        [dispatch, id]
    );

    const handleAddTask = useCallback(
        () =>
            openModal({
                entity: "task",
                initial: { columnId: id },
                onActionClick: (props) =>
                    dispatch(addTask(props as TaskCreatePayload)),
                title: "Add task",
            }),
        [dispatch, id, openModal]
    );

    const handleTaskSelections = useCallback(
        (isSelected: boolean) =>
            dispatch(
                setSelectedIds({
                    ids: tasks.map((task) => task.id),
                    isSelected,
                })
            ),
        [dispatch, tasks]
    );

    const columnRef = useRef<HTMLDivElement>(null);
    const columnIconRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!columnRef.current || isSelectMode) return;

        return dropTargetForElements({
            element: columnRef.current,
            canDrop: ({ source }) => source.data?.type === "task",
            onDrop: ({ source, location }) => {
                const columnEl = columnRef.current;
                if (!columnEl || !source.data) return;

                const { order, taskId, fromColumnId } =
                    source.data as TaskDraggable;

                const taskElements = Array.from(
                    columnEl.querySelectorAll<HTMLElement>("[data-task-id]")
                );
                let newOrder = taskElements.length + 1;

                const dropY = location.current.input.clientY;

                const beforeTask = taskElements.find((el) => {
                    const taskContainer = el.getBoundingClientRect();
                    return dropY < taskContainer.top + taskContainer.height / 2;
                });

                if (beforeTask) {
                    const index = taskElements.findIndex(
                        (el) => el.dataset.taskId === beforeTask.dataset.taskId
                    );
                    newOrder = index + 1;
                }

                dispatch(
                    moveTask({
                        id: taskId,
                        columnId: fromColumnId,
                        newColumnId: id,
                        order,
                        newOrder,
                    })
                );
            },
        });
    }, [dispatch, id, isSelectMode]);

    useEffect(() => {
        if (!columnRef.current || isSelectMode) return;

        return draggable({
            element: columnRef.current,
            ...(columnIconRef.current && { dragHandle: columnIconRef.current }),
            getInitialData: () =>
                ({
                    type: "column",
                    columnId: id,
                    order,
                } as ColumnDraggable),
        });
    }, [id, isSelectMode, order]);

    const filteredTasks = useMemo(() => {
        if (filters?.done && filters?.unDone && !search) return tasks;
        const selectedTasks = tasks.filter(({ isComplete, name }) => {
            const statusMatch =
                !filters ||
                (filters.done && isComplete) ||
                (filters.unDone && !isComplete);
            if (!!search) return statusMatch && matchSearch(name, search);
            return statusMatch;
        });
        return selectedTasks.sort((a, b) => a.order - b.order);
    }, [filters, tasks, search]);

    const handleColumnEdit = useCallback(() => {
        openModal({
            entity: "column",
            initial: { id, title },
            onActionClick: (props) =>
                dispatch(editColumn(props as ColumnEditPayload)),
            title: "Edit column",
        });
    }, [dispatch, id, openModal, title]);

    const handleTaskEdit = useCallback(
        (task: TaskEditPayload) => {
            openModal({
                entity: "task",
                initial: task,
                onActionClick: (props) =>
                    dispatch(editTask(props as TaskEditPayload)),
                title: "Edit task",
            });
        },
        [dispatch, openModal]
    );

    return (
        <Root ref={columnRef} data-column-id={id}>
            <Header>
                <Col>
                    <Row alignEnd={isSelectMode}>
                        <DragIconWrapper
                            ref={columnIconRef}
                            isSelectMode={isSelectMode}
                        >
                            <Icon name="drag" tooltip="Drag to reorder" />
                        </DragIconWrapper>
                        <Row>
                            {!isSelectMode && (
                                <Icon
                                    name="edit"
                                    onClick={handleColumnEdit}
                                    tooltip="Edit column"
                                />
                            )}
                            <Icon
                                name={isSelectMode ? "select" : "add"}
                                tooltip={
                                    isSelectMode
                                        ? "Select all tasks"
                                        : "Add new task"
                                }
                                onClick={
                                    !isSelectMode
                                        ? handleAddTask
                                        : () => handleTaskSelections(true)
                                }
                            />
                            <Icon
                                name={isSelectMode ? "unselect" : "delete"}
                                onClick={
                                    !isSelectMode
                                        ? handleDeleteColumn
                                        : () => handleTaskSelections(false)
                                }
                                tooltip={
                                    isSelectMode
                                        ? "Unselect all tasks"
                                        : "Delete column"
                                }
                            />
                        </Row>
                    </Row>
                    <Title>{title}</Title>
                </Col>
            </Header>
            <List>
                {filteredTasks?.map((props) => (
                    <Task {...props} key={props.id} onEdit={handleTaskEdit} />
                ))}
            </List>
        </Root>
    );
};

export default Column;
