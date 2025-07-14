import React from "react";
import { styled } from "styled-components";
import TextArea from "../TextArea";
import Dropdown from "../Dropdown";
import { useAppSelector } from "../../redux/store";
import { columnsOptionsSelector } from "../../redux/columns/selectors";
import { Col, Label, Row, Wrapper } from "./shared";
import { COLUMN_FIELD, COMPLETE_FIELD, NAME_FIELD } from "./constants";
import { TaskCreatePayload } from "../../redux/types";
import CheckBox from "../CheckBox";

type Props = {
    initial?: TaskCreatePayload;
};

const TaskBodyContent: React.FC<Props> = ({ initial }) => {
    const columnOptions = useAppSelector(columnsOptionsSelector);

    return (
        <Wrapper>
            <Row>
                <Label>Select assignee:</Label>
                <Dropdown options={columnOptions} name={COLUMN_FIELD} />
            </Row>
            <Col>
                <Label>Task title:</Label>
                <TextArea defaultValue={initial?.name} name={NAME_FIELD} />
                <CheckBox
                    defaultChecked={initial?.isComplete ?? false}
                    name={COMPLETE_FIELD}
                    defaultValue={undefined}
                />
            </Col>
        </Wrapper>
    );
};

export default TaskBodyContent;
