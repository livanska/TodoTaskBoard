import React, { useCallback } from "react";
import styled from "styled-components";
import Button from "../Button";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
    deleteTasks,
    moveTasks,
    toggleAllTaskComplete,
} from "../../redux/tasks/reducer";
import { TasksMovePayload } from "../../redux/types";

import { selectModeSelector } from "../../redux/settings/selectors";
import { ModalEntityProps } from "../EntityModal/types";
import SPACINGS from "../../styles/spacings";

const Root = styled.div`
    width: 100%;
    display: flex;
    gap: ${SPACINGS.xs};
    flex-wrap: wrap;
`;

type Props = {
    openModal: (props: ModalEntityProps) => void;
    toggleSelectMode: () => void;
};
const SelectActionsRow: React.FC<Props> = ({ openModal, toggleSelectMode }) => {
    const dispatch = useAppDispatch();
    const { selectedIds } = useAppSelector(selectModeSelector);

    const handleMarkAll = useCallback(
        (isComplete: boolean) => {
            if (selectedIds) {
                dispatch(
                    toggleAllTaskComplete({ ids: selectedIds, isComplete })
                );
                toggleSelectMode();
            }
        },
        [dispatch, selectedIds, toggleSelectMode]
    );

    const handleDeleteSelected = useCallback(() => {
        selectedIds && dispatch(deleteTasks(selectedIds));
        toggleSelectMode();
    }, [dispatch, selectedIds, toggleSelectMode]);

    const handleAllChangeColumn = useCallback(() => {
        openModal({
            entity: "task",
            action: "changeColumn",
            onActionClick: (props) => {
                const { columnId, isComplete } = props as TasksMovePayload;
                columnId &&
                    dispatch(
                        moveTasks({
                            ids: selectedIds,
                            columnId,
                            isComplete,
                        } as TasksMovePayload)
                    );
                toggleSelectMode();
            },
            title: "Move selected tasks to another column",
        });
    }, [dispatch, openModal, selectedIds, toggleSelectMode]);

    return (
        <Root>
            <Button title="Mark all done" onClick={() => handleMarkAll(true)} />
            <Button
                title="Mark all undone"
                onClick={() => handleMarkAll(false)}
            />
            <Button title="Delete all" onClick={handleDeleteSelected} />
            <Button
                title="Move all to column"
                onClick={handleAllChangeColumn}
            />
        </Root>
    );
};

export default SelectActionsRow;
