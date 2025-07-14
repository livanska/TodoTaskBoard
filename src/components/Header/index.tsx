import React, { useCallback } from "react";
import styled from "styled-components";
import Button from "../Button";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addColumn } from "../../redux/columns/reducer";
import useModal from "../../hooks/useModal";
import EntityModal from "../EntityModal";
import { addTask } from "../../redux/tasks/reducer";
import { ColumnCreatePayload, TaskCreatePayload } from "../../redux/types";
import { resetSelectedIds, setSelectMode } from "../../redux/settings/reducer";
import { isSelectModeSelector } from "../../redux/settings/selectors";

const Root = styled.div`
    height: 10rem;
    width: 100%;
    display: flex;
`;

const Wrapper = styled.div``;

const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const isSelectMode = useAppSelector(isSelectModeSelector);

    const { openModal, modalProps } = useModal<
        TaskCreatePayload | ColumnCreatePayload
    >();

    const handleAddAction = useCallback(
        (payload: TaskCreatePayload | ColumnCreatePayload) => {
            if (modalProps.entity === "task")
                dispatch(addTask(payload as TaskCreatePayload));
            else dispatch(addColumn(payload as ColumnCreatePayload));
        },
        [dispatch, modalProps.entity]
    );

    const handleSelectMode = useCallback(() => {
        dispatch(setSelectMode(!isSelectMode));
        dispatch(resetSelectedIds());
    }, [dispatch, isSelectMode]);

    return (
        <Root>
            <Wrapper>
                Table header
                <Button
                    title="New task"
                    onClick={() =>
                        openModal({
                            title: "Add new task",
                            entity: "task",
                            onActionClick: handleAddAction,
                        })
                    }
                />
                <Button
                    title="New column"
                    onClick={() =>
                        openModal({
                            title: "Add new column",
                            entity: "column",
                            onActionClick: handleAddAction,
                        })
                    }
                />
                <Button
                    title={isSelectMode ? "Remove selection" : "Select Tasks"}
                    onClick={handleSelectMode}
                />
            </Wrapper>
            <EntityModal {...modalProps} />
        </Root>
    );
};

export default Header;
