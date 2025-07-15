import React from "react";
import Input from "../Input";
import { LOAD_EXAMPLE_DATA_FIELD, NAME_FIELD } from "./constants";
import { Col, Label } from "./shared";
import CheckBox from "../CheckBox";

const ColumnBodyContent: React.FC = () => {
    return (
        <Col>
            <Label>Board title:</Label>
            <Input width="100%" defaultValue={"My board"} name={NAME_FIELD} />
            <CheckBox
                defaultChecked={true}
                name={LOAD_EXAMPLE_DATA_FIELD}
                label="Start with example data"
            />
        </Col>
    );
};

export default ColumnBodyContent;
