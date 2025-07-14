import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import COLORS, { GLASS_EFFECT } from "../../styles/colors";
import { TaskStoreType } from "../../redux/types";
import { useAppDispatch } from "../../redux/store";
import { deleteTask, toggleTaskComplete } from "../../redux/tasks/reducer";
import Icon from "../Icon";
import SPACINGS from "../../styles/spacings";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { TaskDraggable } from "../../types";

const Root = styled.div<{ isComplete: boolean }>`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: ${({ isComplete }) =>
        isComplete ? COLORS.cardDone : COLORS.card};
    width: 100%;
    padding: ${SPACINGS.xs};
`;

const Header = styled.div`
    display: flex;
    gap: ${SPACINGS.xs};
    width: 100%;
    justify-content: space-between;
`;

const StatusLabel = styled.div<{ isComplete: boolean }>`
    display: flex;
    align-items: center;
    gap: ${SPACINGS.xxs};
    padding: ${SPACINGS.xxs};
    color: ${({ isComplete }) => (isComplete ? COLORS.success : COLORS.info)};
    border-radius: ${SPACINGS.xxs};
    white-space: nowrap;
    ${GLASS_EFFECT};
`;

const Text = styled.div`
    color: ${COLORS.title};
    padding: ${SPACINGS.xs};
    text-align: left;
    width: 100%;
`;

const ActionsRow = styled.div`
    display: flex;
    gap: ${SPACINGS.xs};
    width: 100%;
    justify-content: flex-end;
    align-items: center;
`;

const Task: React.FC<TaskStoreType> = ({
    id,
    columnId,
    isComplete,
    name,
    order,
}) => {
    const taskRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    const handleStatusChange = useCallback(
        () => dispatch(toggleTaskComplete(id)),
        [dispatch, id]
    );

    const handleDelete = useCallback(
        () => dispatch(deleteTask(id)),
        [dispatch, id]
    );

    useEffect(() => {
        if (!taskRef.current) return;

        return draggable({
            element: taskRef.current,
            getInitialData: () =>
                ({
                    type: "task",
                    taskId: id,
                    fromColumnId: columnId,
                    order,
                } as TaskDraggable),
        });
    }, [id, columnId, order]);

    const statusName = isComplete ? "Done" : "Not done";

    return (
        <Root isComplete={isComplete} ref={taskRef} data-task-id={id}>
            <Header>
                <StatusLabel isComplete={isComplete}>
                    <Icon name={isComplete ? "done" : "notDone"} />
                    {statusName}
                </StatusLabel>
                <ActionsRow>
                    <Icon name="edit" onClick={() => {}} />
                    <Icon
                        name={!isComplete ? "done" : "notDone"}
                        onClick={handleStatusChange}
                    />
                    <Icon name="delete" onClick={handleDelete} />
                </ActionsRow>
            </Header>
            <Text>{name}</Text>
        </Root>
    );
};

export default Task;
