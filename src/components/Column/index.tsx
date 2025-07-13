import React, { useCallback } from "react";
import styled from "styled-components";
import COLORS from "../../styles/colors";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { tasksByColumnIdSelector } from "../../redux/tasks/selectors";
import { addTask } from "../../redux/tasks/reducer";
import SPACINGS from "../../styles/spacings";
import { ColumnStoreType } from "../../redux/types";
import Task from "../Task";
import Icon from "../Icon";
import { deleteColumn } from "../../redux/columns/reducer";

const Root = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    background-color: ${COLORS.background};
    border: 1px solid ${COLORS.border};
    border-radius: ${SPACINGS.xs};
    min-width: 15rem;
    max-width: 20rem;
    width: 100%;
    overflow: hidden;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${SPACINGS.xs};
    padding: ${SPACINGS.sm};
    overflow-y: scroll;
    height: 100%;
    width: 100%;
`;

const Title = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const Header = styled.div`
    padding: ${SPACINGS.sm} ${SPACINGS.sm};
    color: ${COLORS.title};
    font-weight: bold;
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-self: center;
`;

const Column: React.FC<ColumnStoreType> = ({ id, title }) => {
    const tasks = useAppSelector(tasksByColumnIdSelector(id));
    const dispatch = useAppDispatch();

    const handleDeleteColumn = useCallback(
        () => dispatch(deleteColumn(id)),
        [dispatch, id]
    );

    const handleAddTask = useCallback(
        () => dispatch(addTask({ columnId: id, name: "New task" })),
        [dispatch, id]
    );

    return (
        <Root>
            <Header>
                <Icon name="add" onClick={handleAddTask} />
                <Title>{title}</Title>
                <Icon name="delete" onClick={handleDeleteColumn} />
            </Header>
            <List>
                {tasks?.map((props) => (
                    <Task {...props} key={props.id} />
                ))}
            </List>
        </Root>
    );
};

export default Column;
