import React from "react";
import styled from "styled-components";
import COLORS from "../../styles/colors";

const Root = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: ${COLORS.background};
`;

const Column: React.FC = () => {
    return <Root></Root>;
};

export default Column;
