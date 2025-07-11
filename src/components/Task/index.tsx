import React from "react";
import styled from "styled-components";
import COLORS from "../../styles/colors";

const Root = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${COLORS.card};
`;

const Task: React.FC = () => {
    return <Root></Root>;
};

export default Task;
