import { BaseObject } from "styled-components/dist/types";

export const DEVICE = {
    mobile: `(max-width: 768px)`,
    desktop: `(min-width: 1024px)`,
};

export const forMobile = (styles: BaseObject) =>
    `@media ${DEVICE.mobile} { ${styles} }`;

export const forDesktop = (styles: BaseObject) =>
    `@media ${DEVICE.mobile} { ${styles} }`;
