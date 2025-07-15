import React from "react";
import TextArea from "../TextArea";
import Dropdown from "../Dropdown";
import { useAppSelector } from "../../redux/store";
import { columnsOptionsSelector } from "../../redux/columns/selectors";
import { Col, Label } from "./shared";
import { COLUMN_FIELD, COMPLETE_FIELD, NAME_FIELD } from "./constants";
import { TaskCreatePayload } from "../../redux/types";
import CheckBox from "../CheckBox";

type Props = {
    initial?: TaskCreatePayload;
};

const TaskBodyContent: React.FC<Props> = ({ initial }) => {
    const columnOptions = useAppSelector(columnsOptionsSelector);

    return (
        <Col noGap={false}>
            <Col noGap>
                <Label>Assign to column:</Label>
                <Dropdown
                    options={columnOptions}
                    name={COLUMN_FIELD}
                    initial={initial?.columnId}
                />
            </Col>
            <Col>
                <Col noGap>
                    <Label>Task content:</Label>
                    <TextArea defaultValue={initial?.name} name={NAME_FIELD} />
                </Col>
                <CheckBox
                    defaultChecked={initial?.isComplete}
                    name={COMPLETE_FIELD}
                    label="Completed"
                />
            </Col>
        </Col>
    );
};

export default TaskBodyContent;
