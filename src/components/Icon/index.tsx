import { IconBaseProps } from "react-icons";
import { ICON_TYPES, IconName } from "./constants";
import { styled } from "styled-components";
import { withTooltip } from "../Tooltip/withTooltip";
import { forwardRef } from "react";

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

const BaseIconComponent = forwardRef<HTMLDivElement, Props>(
    ({ name, onClick }, ref) => {
        const Icon = ICON_TYPES[name] as React.ComponentType<IconBaseProps>;
        if (!Icon) return null;

        return (
            <Wrapper onClick={onClick} ref={ref}>
                <Icon />
            </Wrapper>
        );
    }
);

const IconComponent = (props: Props) => {
    const { tooltip } = props;

    const Wrapped = tooltip
        ? withTooltip(BaseIconComponent, tooltip)
        : BaseIconComponent;

    return <Wrapped {...props} />;
};

export default IconComponent;
