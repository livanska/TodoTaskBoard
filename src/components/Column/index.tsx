import React from "react";
import styled from "styled-components";
import COLORS from "../../styles/colors";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectTasksByColumnId } from "../../redux/tasks/selectors";
import { addTask } from "../../redux/tasks/reducer";
import SPACINGS from "../../styles/spacings";
import { ColumnStoreType } from "../../redux/types";

const Root = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    background-color: ${COLORS.background};
    min-width: 15rem;
    gap: ${SPACINGS.xs};
`;

const Column: React.FC<ColumnStoreType> = ({ id, title }) => {
    const tasks = useAppSelector(selectTasksByColumnId(id));
    const dispatch = useAppDispatch();

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
