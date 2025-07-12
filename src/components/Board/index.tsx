import React from "react";
import styled from "styled-components";
import COLORS, { GLASS_EFFECT } from "../../styles/colors";
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
    padding: ${SPACINGS.xs};
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border-radius: ${SPACINGS.sm};
    padding: ${SPACINGS.xs};
    overflow: hidden;
    border-radius: ${SPACINGS.sm};
    border: 1px solid ${COLORS.border};
    ${GLASS_EFFECT};
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: ${SPACINGS.sm};
    width: 100%;
    height: 100%;
    overflow-y: hidden;
`;

const Board: React.FC = () => {
    const columns = useAppSelector(columnsSelector);

    return (
        <Root>
            <Wrapper>
                <Header />
                <ContentWrapper>
                    {columns?.map((props) => (
                        <Column {...props} key={props.id} />
                    ))}
                </ContentWrapper>
            </Wrapper>
        </Root>
    );
};

export default Board;
