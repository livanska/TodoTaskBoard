import React from "react";
import styled from "styled-components";
import COLORS from "../../styles/colors";
import Column from "../Column";
import SPACINGS from "../../styles/spacings";
import { useAppSelector } from "../../redux/store";
import { columnsSelector } from "../../redux/columns/reducer";
import Header from "../Header";

const Root = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: ${COLORS.white};
    padding: ${SPACINGS.xs};
    background: ${COLORS.backgroundGradient};
    box-sizing: border-box;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(100% - ${SPACINGS.md});
    height: calc(100% - ${SPACINGS.md});
    border: 1px solid ${COLORS.border};
    border-radius: ${SPACINGS.sm};
    padding: ${SPACINGS.sm};
    overflow: hidden;

    backdrop-filter: blur(6px) saturate(103%);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    -webkit-backdrop-filter: blur(6px) saturate(103%);
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.3);
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: ${SPACINGS.sm};
    width: 100%;
    height: 100%;
`;

const Board: React.FC = () => {
    const columns = useAppSelector(columnsSelector);

    return (
        <Root>
            <Wrapper>
                <Header />
                <ContentWrapper>
                    {columns.map((props) => (
                        <Column {...props} key={props.id + props.title} />
                    ))}
                </ContentWrapper>
            </Wrapper>
        </Root>
    );
};

export default Board;
