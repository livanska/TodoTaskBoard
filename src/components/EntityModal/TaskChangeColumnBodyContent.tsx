import React from "react";
import { COLUMN_FIELD } from "./constants";
import { TasksMovePayload } from "../../redux/types";
import { COMPLETE_FIELD } from "./constants";
import Dropdown from "../Dropdown";
import { Label, Col, Wrapper } from "./shared";
import { columnsOptionsSelector } from "../../redux/columns/selectors";
import { useAppSelector } from "../../redux/store";
import CheckBox from "../CheckBox";

type Props = {
    initial?: TasksMovePayload;
};

const TaskChangeColumnBodyContent: React.FC<Props> = ({ initial }) => {
    const columnOptions = useAppSelector(columnsOptionsSelector);

    return (
        <Wrapper>
            <Col>
                <Col>
                    <Label>Assign to column:</Label>
                    <Dropdown
                        options={columnOptions}
                        name={COLUMN_FIELD}
                        initial={initial?.columnId}
                    />
                </Col>
                <CheckBox
                    defaultChecked={initial?.isComplete}
                    name={COMPLETE_FIELD}
                    label="Set all completed"
                />
            </Col>
        </Wrapper>
    );
};

export default TaskChangeColumnBodyContent;
