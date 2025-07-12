import React from "react";
import styled from "styled-components";
import COLORS from "../../styles/colors";
import Column from "../Column";
import SPACINGS from "../../styles/spacings";
import { useAppSelector } from "../../redux/store";
import { columnsSelector } from "../../redux/columns/reducer";

const Root = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: ${COLORS.white};
    padding: ${SPACINGS.xs};
    box-sizing: border-box;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: ${SPACINGS.sm};
    border: 1px solid ${COLORS.border};
    width: 100%;
    height: 100%;
`;

const Board: React.FC = () => {
    const columns = useAppSelector(columnsSelector);

    return (
        <Root>
            <Wrapper>
                {columns.map((props) => (
                    <Column {...props} key={props.id + props.title} />
                ))}
            </Wrapper>
        </Root>
    );
};

export default Board;
