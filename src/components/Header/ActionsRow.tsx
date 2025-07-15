import React, { useCallback } from "react";
import styled from "styled-components";
import Button from "../Button";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addColumn } from "../../redux/columns/reducer";
import { addTask } from "../../redux/tasks/reducer";
import { ColumnCreatePayload, TaskCreatePayload } from "../../redux/types";
import { EntityPayload, ModalEntityProps } from "../EntityModal/types";
import { EntityType } from "../../types";
import SPACINGS from "../../styles/spacings";
import { hasColumnsSelector } from "../../redux/columns/selectors";

const Root = styled.div`
    width: 100%;
    display: flex;
    gap: ${SPACINGS.xs};
    align-items: center;
`;

type Props = {
    openModal: (props: ModalEntityProps) => void;
};
const ActionsRow: React.FC<Props> = ({ openModal }) => {
    const hasColumns = useAppSelector(hasColumnsSelector);
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
                disabled={!hasColumns}
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
