import isNum from "./isNum";

const deriveStyles = (styles) => {
  // if property is a number,
  // add px at the end
  let newStyles = {};
  for (let key in styles) {
    if (isNum(key)) {
      newStyles[key] = `${styles[key]}px`;
    } else {
      newStyles[key] = `${styles[key]}`;
    }
  }

  //   derive shorthand notation from values
  newStyles.padding = `${newStyles.paddingY} ${newStyles.paddingX}`;
  newStyles.border = `${newStyles["border-width"]} ${newStyles["border-color"]} ${styles["border-type"]}`;

  // deleting values that are available as  shorthand
  delete newStyles.paddingX;
  delete newStyles.paddingY;
  delete newStyles["border-color"];
  delete newStyles["border-width"];
  delete newStyles["border-type"];

  return newStyles;
};

export default deriveStyles;