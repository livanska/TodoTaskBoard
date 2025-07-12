import React from "react";
import styled from "styled-components";
import COLORS from "../../styles/colors";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectTasksByColumnId } from "../../redux/tasks/selectors";
import { addTask } from "../../redux/tasks/reducer";
import SPACINGS from "../../styles/spacings";
import { ColumnStoreType } from "../../redux/types";
import Button from "../Button";
import Task from "../Task";

const Root = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    background-color: ${COLORS.background};
    border: 1px solid ${COLORS.border};
    border-radius: ${SPACINGS.xs};
    min-width: 15rem;
    gap: ${SPACINGS.xs};
    padding: ${SPACINGS.xs};
`;

const Column: React.FC<ColumnStoreType> = ({ id, title }) => {
    const tasks = useAppSelector(selectTasksByColumnId(id));
    const dispatch = useAppDispatch();

    return (
        <Root>
            {title}
            {tasks.map((props) => (
                <Task {...props} />
            ))}
            <Button
                title="Add new task"
                onClick={() => {
                    dispatch(addTask({ columnId: id, name: "New task" }));
                }}
            />
        </Root>
    );
};

export default Column;
