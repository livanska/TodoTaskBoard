import React from "react";
import Input from "../Input";
import { TITLE_FIELD } from "./constants";
import { ColumnCreatePayload } from "../../redux/types";
import { Label, Wrapper } from "./shared";

type Props = {
    initial?: ColumnCreatePayload;
};

const ColumnBodyContent: React.FC<Props> = ({ initial }) => {
    return (
        <Wrapper>
            <Label>Column title:</Label>
            <Input
                width="100%"
                defaultValue={initial?.title}
                name={TITLE_FIELD}
            />
        </Wrapper>
    );
};

export default ColumnBodyContent;
