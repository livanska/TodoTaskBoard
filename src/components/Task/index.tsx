import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import COLORS, { GLASS_EFFECT } from "../../styles/colors";
import { TaskStoreType } from "../../redux/types";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { deleteTask, toggleTaskComplete } from "../../redux/tasks/reducer";
import Icon from "../Icon";
import SPACINGS from "../../styles/spacings";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { TaskDraggable } from "../../types";
import {
    isSelectedIdSelector,
    isSelectModeSelector,
} from "../../redux/settings/selectors";
import { setSelectedIds } from "../../redux/settings/reducer";

const Wrapper = styled.div<{ isComplete?: boolean; isSelectMode?: boolean }>`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: ${({ isComplete }) =>
        isComplete ? COLORS.cardDone : COLORS.card};
    width: 100%;
    padding: ${SPACINGS.xs};
    position: relative;
    border-radius: ${SPACINGS.xxs};
    z-index: 1;
    ${({ isSelectMode }) =>
        isSelectMode &&
        `cursor: pointer;
          opacity: 0.5;
          
          *{
          pointer-events: none;}`}
`;

const Root = styled.div<{ isSelectMode?: boolean }>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    ${({ isSelectMode }) => !isSelectMode && `cursor: pointer;`}
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

const IconWrapper = styled.div`
    position: absolute;
    cursor: pointer;
    bottom: ${SPACINGS.xs};
    right: ${SPACINGS.xs};
    z-index: 2;
    opacity: 1;
    color: ${COLORS.subtitle};
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
    const isSelectMode = useAppSelector(isSelectModeSelector);
    const isSelected = useAppSelector(isSelectedIdSelector(id));

    const handleStatusChange = useCallback(
        () => dispatch(toggleTaskComplete(id)),
        [dispatch, id]
    );

    const handleDelete = useCallback(
        () => dispatch(deleteTask(id)),
        [dispatch, id]
    );

    const handleSelect = useCallback(
        () =>
            isSelectMode &&
            dispatch(setSelectedIds({ ids: [id], isSelected: !!!isSelected })),
        [dispatch, id, isSelectMode, isSelected]
    );

    useEffect(() => {
        if (!taskRef.current || isSelectMode) return;

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
    }, [id, columnId, order, isSelectMode]);

    return (
        <Root
            ref={taskRef}
            data-task-id={id}
            isSelectMode={isSelectMode}
            onClick={handleSelect}
        >
            <Wrapper isComplete={isComplete} isSelectMode={isSelectMode}>
                <Header>
                    <StatusLabel isComplete={isComplete}>
                        <Icon name={isComplete ? "done" : "notDone"} />
                        {isComplete ? "Done" : "Not done"}
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
            </Wrapper>
            {isSelectMode && !!isSelected && (
                <IconWrapper>
                    <Icon name="select" />
                </IconWrapper>
            )}
        </Root>
    );
};

export default Task;
