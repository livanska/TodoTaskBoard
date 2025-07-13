import React, { useCallback } from "react";
import styled from "styled-components";
import Button from "../Button";
import { useAppDispatch } from "../../redux/store";
import { addColumn } from "../../redux/columns/reducer";
import useModal from "../../hooks/useModal";
import EntityModal from "../EntityModal";
import { addTask } from "../../redux/tasks/reducer";
import { ColumnCreatePayload, TaskCreatePayload } from "../../redux/types";

const Root = styled.div`
    height: 10rem;
    width: 100%;
    display: flex;
`;

const Wrapper = styled.div``;

const Header: React.FC = () => {
    const dispatch = useAppDispatch();
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

    return (
        <Root>
            <Wrapper>
                Table header
                <Button
                    title="New task"
                    onClick={() =>
                        openModal({
                            title: "New task",
                            entity: "task",
                            initial: "New task",
                            onActionClick: handleAddAction,
                        })
                    }
                />
                <Button
                    title="New column"
                    onClick={() =>
                        openModal({
                            entity: "column",
                            onActionClick: handleAddAction,
                        })
                    }
                />
            </Wrapper>
            <EntityModal {...modalProps} />
        </Root>
    );
};

export default Header;
