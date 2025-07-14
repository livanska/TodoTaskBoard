import React, { useCallback } from "react";
import styled from "styled-components";
import Button from "../Button";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addColumn } from "../../redux/columns/reducer";
import useModal from "../../hooks/useModal";
import EntityModal from "../EntityModal";
import {
    addTask,
    deleteTasks,
    moveTasks,
    toggleAllTaskComplete,
} from "../../redux/tasks/reducer";
import {
    ColumnCreatePayload,
    TaskCreatePayload,
    TasksMovePayload,
} from "../../redux/types";
import { resetSelectedIds, setSelectMode } from "../../redux/settings/reducer";
import {
    selectedIdsSelector,
    selectModeSelector,
} from "../../redux/settings/selectors";
import { EntityPayload, ModalEntityProps } from "../EntityModal/types";
import { EntityType } from "../../types";
import SPACINGS from "../../styles/spacings";

const Root = styled.div`
    width: 100%;
    display: flex;
    gap: ${SPACINGS.xs};
`;

type Props = {
    openModal: (props: ModalEntityProps) => void;
};
const ActionsRow: React.FC<Props> = ({ openModal }) => {
    const dispatch = useAppDispatch();

    const handleAddAction = useCallback(
        (payload: EntityPayload, entity: EntityType) => {
            if (entity === "task")
                dispatch(addTask(payload as TaskCreatePayload));
            else dispatch(addColumn(payload as ColumnCreatePayload));
        },
        [dispatch]
    );

    return (
        <Root>
            <Button
                title="New task"
                onClick={() =>
                    openModal({
                        title: "New task",
                        entity: "task",
                        onActionClick: (props) =>
                            handleAddAction(props, "task"),
                    })
                }
            />
            <Button
                title="New column"
                onClick={() =>
                    openModal({
                        title: "New column",
                        entity: "column",
                        onActionClick: (props) =>
                            handleAddAction(props, "column"),
                    })
                }
            />
        </Root>
    );
};

export default ActionsRow;
