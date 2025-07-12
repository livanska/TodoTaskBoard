import React from "react";
import styled from "styled-components";
import COLORS from "../../styles/colors";
import { TaskStoreType } from "../../redux/types";
import Button from "../Button";
import { useAppDispatch } from "../../redux/store";
import { toggleTaskComplete } from "../../redux/tasks/reducer";

const Root = styled.div<{ isComplete: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ isComplete }) =>
        isComplete ? COLORS.cardDone : COLORS.card};
    width: 100%;
`;

const Text = styled.div`
    color: ${COLORS.title};
`;

const Task: React.FC<TaskStoreType> = ({
    id,
    columnId,
    isComplete,
    name,
    order,
}) => {
    const dispatch = useAppDispatch();

    const handleStatusChange = () => dispatch(toggleTaskComplete(id));

    return (
        <Root isComplete={isComplete}>
            <Text>{name}</Text>
            <Button title={"Mark as done"} onClick={handleStatusChange} />
        </Root>
    );
};

export default Task;
