import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import COLORS from "../../styles/colors";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { tasksByColumnIdSelector } from "../../redux/tasks/selectors";
import { addTask, moveTask } from "../../redux/tasks/reducer";
import SPACINGS from "../../styles/spacings";
import { ColumnStoreType } from "../../redux/types";
import Task from "../Task";
import Icon from "../Icon";
import { deleteColumn } from "../../redux/columns/reducer";
import {
    draggable,
    dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { ColumnDraggable, TaskDraggable } from "../../types";
import { isSelectModeSelector } from "../../redux/settings/selectors";
import { setSelectedIds } from "../../redux/settings/reducer";

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
    padding: ${SPACINGS.sm};
    overflow-y: scroll;
    height: 100%;
    width: 100%;
`;

const Title = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    padding-left: ${SPACINGS.xs};
`;

const Header = styled.div`
    padding: ${SPACINGS.sm} ${SPACINGS.sm};
    color: ${COLORS.title};
    font-weight: bold;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-self: center;
`;

const Row = styled.div`
    display: flex;
    gap: ${SPACINGS.xs};
    justify-content: end;
    align-items: center;
`;

const DragIconWrapper = styled.div<{ isSelectMode?: boolean }>`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: ${SPACINGS.sm};
    ${({ isSelectMode }) => isSelectMode && `visibility: hidden;`}
`;

const Column: React.FC<ColumnStoreType> = ({ id, title, order }) => {
    const tasks = useAppSelector(tasksByColumnIdSelector(id));
    const isSelectMode = useAppSelector(isSelectModeSelector);

    const dispatch = useAppDispatch();

    const handleDeleteColumn = useCallback(
        () => dispatch(deleteColumn(id)),
        [dispatch, id]
    );

    const handleAddTask = useCallback(
        () => dispatch(addTask({ columnId: id, name: "New task" })),
        [dispatch, id]
    );

    const handleTskSelections = useCallback(
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
        if (!columnRef.current || !isSelectMode) return;

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
        if (!columnRef.current || !isSelectMode) return;

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

    return (
        <Root ref={columnRef} data-column-id={id}>
            <Header>
                <DragIconWrapper
                    ref={columnIconRef}
                    isSelectMode={isSelectMode}
                >
                    <Icon name="drag" />
                </DragIconWrapper>
                <Title>{title}</Title>
                <Row>
                    <Icon
                        name={isSelectMode ? "select" : "add"}
                        onClick={
                            !isSelectMode
                                ? handleAddTask
                                : () => handleTskSelections(true)
                        }
                    />
                    <Icon
                        name={isSelectMode ? "unselect" : "delete"}
                        onClick={
                            !isSelectMode
                                ? handleDeleteColumn
                                : () => handleTskSelections(false)
                        }
                    />
                </Row>
            </Header>
            <List>
                {tasks?.map((props) => (
                    <Task {...props} key={props.id} />
                ))}
            </List>
        </Root>
    );
};

export default Column;
