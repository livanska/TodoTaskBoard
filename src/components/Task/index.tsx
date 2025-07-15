import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import COLORS, { BOX_SHADOW, GLASS_EFFECT } from "../../styles/colors";
import { TaskEditPayload, TaskStoreType } from "../../redux/types";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { deleteTask, toggleTaskComplete } from "../../redux/tasks/reducer";
import Icon from "../Icon";
import SPACINGS from "../../styles/spacings";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { TaskDraggable } from "../../types";
import {
    isSelectedIdSelector,
    selectModeSelector,
} from "../../redux/settings/selectors";
import { setSelectedIds } from "../../redux/settings/reducer";
import FONT_STYLES from "../../styles/fontStyles";

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
          opacity: 0.6;

           &:hover {
           opacity: 1;
           }
          
          *{
          pointer-events: none;}
          `}
`;

const Root = styled.div<{
    isComplete?: boolean;
    isSelectMode?: boolean;
    isSelected?: boolean;
}>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${SPACINGS.xxs};
    border: 1px solid transparent;

    ${({ isSelectMode, isComplete }) =>
        !isSelectMode
            ? `cursor: pointer;`
            : `
        &:hover {
       ${BOX_SHADOW}
       border: 1px solid ${isComplete ? COLORS.success : COLORS.info};
        background-color: ${isComplete ? COLORS.success : COLORS.info}70;
        }
    `}
    ${({ isSelected, isComplete }) =>
        isSelected &&
        `background-color: ${isComplete ? COLORS.success : COLORS.info}90;`};
`;

const Header = styled.div`
    display: flex;
    gap: ${SPACINGS.xs};
    width: 100%;
    justify-content: space-between;
`;

const StatusLabel = styled.div<{ isComplete: boolean }>`
    ${FONT_STYLES.label}
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
    padding: ${SPACINGS.xs};
    text-align: left;
    width: 100%;
    ${FONT_STYLES.text}
`;

const ActionsRow = styled.div`
    display: flex;
    gap: ${SPACINGS.xs};
    width: 100%;
    justify-content: flex-end;
    align-items: center;
`;

const IconWrapper = styled.div<{ isComplete?: boolean }>`
    position: absolute;
    cursor: pointer;
    bottom: ${SPACINGS.xs};
    right: ${SPACINGS.xs};
    z-index: 2;
    opacity: 1;
    color: ${({ isComplete }) => (isComplete ? COLORS.success : COLORS.info)};
`;

type Props = {
    onEdit: (id: TaskEditPayload) => void;
} & TaskStoreType;

const Task: React.FC<Props> = ({
    id,
    columnId,
    isComplete,
    name,
    order,
    onEdit,
}) => {
    const taskRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const { isSelectMode } = useAppSelector(selectModeSelector);
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

    const handleEdit = useCallback(
        () => onEdit({ id, columnId, isComplete, name }),
        [onEdit, id, columnId, isComplete, name]
    );

    return (
        <Root
            ref={taskRef}
            data-task-id={id}
            isSelectMode={isSelectMode}
            onClick={handleSelect}
            isComplete={isComplete}
            isSelected={!!isSelected}
        >
            <Wrapper
                isComplete={isComplete}
                isSelectMode={isSelectMode}
                onDoubleClick={() => !isSelectMode && handleEdit()}
            >
                <Header>
                    <StatusLabel isComplete={!!isComplete}>
                        <Icon name={isComplete ? "done" : "notDone"} />
                        {isComplete ? "Done" : "Not done"}
                    </StatusLabel>
                    <ActionsRow>
                        <Icon
                            name="edit"
                            onClick={handleEdit}
                            tooltip="Edit task"
                        />
                        <Icon
                            name={!isComplete ? "done" : "notDone"}
                            onClick={handleStatusChange}
                            tooltip={
                                isComplete ? "Mark as not done" : "Mark as done"
                            }
                        />
                        <Icon
                            name="delete"
                            onClick={handleDelete}
                            tooltip="Delete task"
                        />
                    </ActionsRow>
                </Header>
                <Text>{name}</Text>
            </Wrapper>
            {isSelectMode && !!isSelected && (
                <IconWrapper isComplete={isComplete}>
                    <Icon name="select" />
                </IconWrapper>
            )}
        </Root>
    );
};

export default Task;
