import React from "react";
import styled from "styled-components";
import COLORS from "../../styles/colors";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectTasksByColumnId } from "../../redux/tasks/selectors";
import { addTask } from "../../redux/tasks/reducer";

const Root = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: ${COLORS.background};
`;

const Column: React.FC = () => {
    const tasks = useAppSelector(selectTasksByColumnId(1));
    const dispatch = useAppDispatch();
    console.log(tasks);
    return (
        <Root>
            {tasks.map(({ name, id }) => (
                <div key={id + name}>{name}</div>
            ))}
            <button
                style={{ width: 100 }}
                onClick={() => {
                    dispatch(addTask());
                }}
            >
                Add task
            </button>
        </Root>
    );
};

export default Column;
