import React, { useCallback } from "react";
import styled from "styled-components";
import COLORS from "../../styles/colors";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectTasksByColumnId } from "../../redux/tasks/selectors";
import { addTask } from "../../redux/tasks/reducer";
import SPACINGS from "../../styles/spacings";
import { ColumnStoreType } from "../../redux/types";
import Task from "../Task";
import Icon from "../Icon";

const Root = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    background-color: ${COLORS.background};
    border: 1px solid ${COLORS.border};
    border-radius: ${SPACINGS.xs};
    min-width: 15rem;
    overflow: hidden;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${SPACINGS.xs};
    padding: ${SPACINGS.sm};
    overflow-y: scroll;
    height: 100%;
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
    justify-content: flex-end;
    padding-left: ${SPACINGS.md};
`;

const IconWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-self: center;
    justify-self: end;
`;

const Column: React.FC<ColumnStoreType> = ({ id, title }) => {
    const tasks = useAppSelector(selectTasksByColumnId(id));
    const dispatch = useAppDispatch();

    const handleAddTask = useCallback(
        () => dispatch(addTask({ columnId: id, name: "New task" })),
        [dispatch, id]
    );

    return (
        <Root>
            <Header>
                <Title>{title}</Title>
                <IconWrapper>
                    <Icon name="add" onClick={handleAddTask} />
                </IconWrapper>
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
