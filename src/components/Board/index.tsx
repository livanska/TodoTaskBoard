import React from "react";
import styled from "styled-components";
import COLORS from "../../styles/colors";
import Column from "../Column";

const Root = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: ${COLORS.white};
`;

const Board: React.FC = () => {
    return (
        <Root>
            <Column />
        </Root>
    );
};

export default Board;
