import styled from "styled-components";
import SPACINGS from "../../styles/spacings";
import FONT_STYLES from "../../styles/fontStyles";

export const Label = styled.div`
    ${FONT_STYLES.label}
`;

export const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: ${SPACINGS.xs};
`;

export const Col = styled.div<{ noGap?: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    flex-grow: 1;
    height: 100%;
    gap: ${({ noGap }) => (noGap ? 0 : SPACINGS.xs)};
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;
