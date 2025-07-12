import { IconBaseProps } from "react-icons";
import { ICON_TYPES, IconName } from "./constants";
import { styled } from "styled-components";

type Props = {
    name: IconName;
    onClick?: () => void;
};

const Wrapper = styled.div`
    ${({ onClick }) => !!onClick && "cursor: pointer"};
    height: fit-content;
    width: fit-content;
    display: flex;
`;

const IconComponent: React.FC<Props> = ({ name, onClick }) => {
    const Icon = ICON_TYPES[name] as React.ComponentType<IconBaseProps>;
    if (!Icon) return null;

    return (
        <Wrapper onClick={onClick}>
            <Icon />
        </Wrapper>
    );
};

export default IconComponent;
