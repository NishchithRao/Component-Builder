import React, { ReactElement } from "react";
import { ComponentJSONProps } from "../customTypes";
import { getProperties } from "../properties";
import { createMethodsObject } from "../utils";
import { getChildren } from "./children";

export const createCustom = (
  json: ComponentJSONProps,
  userProps: any
): ReactElement | null => {
  const {
    layer: { children },
  } = json;

  const { props, children: propChildren } = getProperties(json, userProps);

  const finalChildren = children?.map((child) => {
    return {
      ...child,
      layer: {
        ...child?.layer,
        style: {
          ...child?.layer.style,
        },
      },
    };
  });

  return React.createElement(
    json.layer.element || "div",
    {
      ...props,
      ...createMethodsObject(json),
      key: props.key || json.metaData?.id,
    },
    json.layer.children
      ? getChildren(finalChildren || propChildren, userProps)
      : undefined
  );
};
