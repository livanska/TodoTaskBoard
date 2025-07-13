import React from "react";
import { styled } from "styled-components";
import COLORS from "../../styles/colors";
import TextArea from "../TextArea";
import Dropdown from "../Dropdown";
import { useAppSelector } from "../../redux/store";
import { columnsOptionsSelector } from "../../redux/columns/selectors";
import { Row } from "./shared";
import { COLUMN_FIELD, NAME_FIELD } from "./constants";

type Props = {
    initial?: string;
};
const Label = styled.div`
    color: ${COLORS.font};
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const TaskBodyContent: React.FC<Props> = ({ initial }) => {
    const columnOptions = useAppSelector(columnsOptionsSelector);

    return (
        <Wrapper>
            <Row>
                <Label>Select assignee:</Label>
                <Dropdown options={columnOptions} name={COLUMN_FIELD} />
            </Row>
            <Label>Task title:</Label>
            <TextArea defaultValue={initial} name={NAME_FIELD} />
        </Wrapper>
    );
};

export default TaskBodyContent;
