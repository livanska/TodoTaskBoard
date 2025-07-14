import { IconBaseProps } from "react-icons";
import { ICON_TYPES, IconName } from "./constants";
import { styled } from "styled-components";
import { withTooltip } from "../Tooltip/withTooltip";

type Props = {
    name: IconName;
    onClick?: () => void;
    tooltip?: string;
};

const Wrapper = styled.div`
    ${({ onClick }) => !!onClick && "cursor: pointer"};
    height: fit-content;
    width: fit-content;
    display: flex;
`;

const IconComponent: React.FC<Props> = ({ tooltip, name, onClick }) => {
    const Icon = ICON_TYPES[name] as React.ComponentType<IconBaseProps>;
    if (!Icon) return null;

    const Component = (
        <Wrapper onClick={onClick}>
            <Icon />
        </Wrapper>
    );
    return tooltip
        ? withTooltip(() => Component, tooltip)({ name, onClick })
        : Component;
};

export default IconComponent;
