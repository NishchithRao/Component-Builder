import { ComponentJSONProps } from "./customTypes";
import { createBox, createCustom, createImage, createText } from "./elements";

export const createComponent = (
  json: ComponentJSONProps | undefined,
  userProps: any
): JSX.Element | null => {
  if (!json) return null;
  const { layer } = json;
  const { type } = layer;

  switch (type) {
    case "box":
      return createBox(json, userProps);
    case "text":
      return createText(json, userProps);
    case "image":
      return createImage(json, userProps);
    case "custom":
      return createCustom(json, userProps);
    default:
      return null;
  }
};
