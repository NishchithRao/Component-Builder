import { ComponentJSONProps } from "./customTypes";

export let golbalStyles: { [key: string]: string } = {};

const createStyleAsString = (
  styles: ComponentJSONProps["layer"]["style"] | string,
  important?: boolean
) => {
  return Object.assign(
    {},
    ...Object.entries(styles || {})
      .filter(
        ([_, value]) => typeof value === "string" || typeof value === "number"
      )
      .map(([key, styleValue]) => ({
        [key]: `${styleValue} ${important ? "!important" : ""}`,
      }))
  );
};

export const createStyleObject = (
  styles: ComponentJSONProps["layer"]["style"],
  id?: string,
  important?: boolean
): void => {
  const directStyles = createStyleAsString(styles, important);
  const pseudoStyles = Object.entries(styles || {}).filter(
    ([_, value]) => typeof value === "object"
  );
  golbalStyles[`.${id}`] = {
    ...directStyles,
    ...(golbalStyles[`.${id}`] || {}),
  };

  pseudoStyles.forEach(([pseudoKey, pseudoValue]) => {
    if (pseudoValue) {
      golbalStyles[`.${id}${pseudoKey}`] = createStyleAsString(
        pseudoValue as string,
        important
      );
    }
  });
};

export const createStyles = (styles: any): string[] => {
  const styleList = Object.entries(styles).map(([key, value]) => {
    return `${key} { ${Object.entries(value as Object)
      .map(([prop, val]) => `${prop}:${val};`)
      .join(" ")} }`;
  });
  golbalStyles = {};
  return styleList;
};
