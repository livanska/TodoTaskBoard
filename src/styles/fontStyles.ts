import COLORS from "./colors";

const FONT_STYLES = {
    titleXl: `
  font-size: 24px;
  font-weight: bold;
  color: ${COLORS.title};`,
    title: `
  font-size: 20px;
  font-weight: bold;
  color: ${COLORS.title};
  `,
    subtitle: `
  font-size: 16px;
  font-weight: bold;
  color: ${COLORS.subtitle};
  `,
    text: `
  font-size: 14px;
  color: ${COLORS.font};
  `,
    label: `
  font-size: 12px;
  font-weight: bold;
  color: ${COLORS.subtitle};`,
    placeholder: `
  font-size: 12px;
  color: ${COLORS.subtitle};
  font-weight: normal;`,
    labelInverted: `
  font-size: 12px;
  font-weight: bold;
  color:${COLORS.white};`,
};

export default FONT_STYLES;
