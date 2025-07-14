import styled from "styled-components";
import COLORS from "../../styles/colors";
import SPACINGS from "../../styles/spacings";

export const Label = styled.div`
    color: ${COLORS.font};
`;

export const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: ${SPACINGS.xs};
`;

export const Col = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    flex-grow: 1;
    height: 100%;
    gap: ${SPACINGS.xs};
`;
