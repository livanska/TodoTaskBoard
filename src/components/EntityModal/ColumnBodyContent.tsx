import React from "react";
import { styled } from "styled-components";
import COLORS from "../../styles/colors";
import SPACINGS from "../../styles/spacings";
import Input from "../Input";
import { NAME_FIELD, TITLE_FIELD } from "./constants";
import { ColumnCreatePayload } from "../../redux/types";

type Props = {
    initial?: ColumnCreatePayload;
};

const Label = styled.div`
    color: ${COLORS.font};
`;

const ColumnBodyContent: React.FC<Props> = ({ initial }) => {
    return (
        <>
            <Label>Column title:</Label>
            <Input defaultValue={initial?.title} name={TITLE_FIELD} />
        </>
    );
};

export default ColumnBodyContent;
