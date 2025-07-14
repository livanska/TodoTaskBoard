import React, { useCallback } from "react";
import Modal from "../Modal";
import { styled } from "styled-components";
import useModal from "../../hooks/useModal";
// import TaskBodyContent from "./TaskBodyContent";
import { COLUMN_FIELD, FORM_ID, NAME_FIELD } from "./constants";
import { ModalProps } from "../Modal/types";
import { TaskCreatePayload, TasksMovePayload } from "../../redux/types";
import { COMPLETE_FIELD } from "./constants";
import SPACINGS from "../../styles/spacings";
import Dropdown from "../Dropdown";
import { Row, Label, Col, Wrapper } from "./shared";
import { columnsOptionsSelector } from "../../redux/columns/selectors";
import { useAppSelector } from "../../redux/store";

type Props = {
    initial?: TasksMovePayload;
};

const TaskChangeColumnBodyContent: React.FC<Props> = ({ initial }) => {
    const columnOptions = useAppSelector(columnsOptionsSelector);

    return (
        <Wrapper>
            <Row>
                <Label>Select assignee:</Label>
                <Dropdown options={columnOptions} name={COLUMN_FIELD} />
            </Row>
            <Col>
                <input
                    type="checkbox"
                    name={COMPLETE_FIELD}
                    defaultValue={undefined}
                />
            </Col>
        </Wrapper>
    );
};

export default TaskChangeColumnBodyContent;
