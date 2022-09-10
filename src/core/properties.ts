import { ComponentJSONProps } from "./customTypes";
import { createStyleObject } from "./styles";
import { createCLassName } from "./utils";

export const getProperties = (
  json: ComponentJSONProps,
  userProps: any
): {
  props: {
    key?: string;
    className?: string;
  } & ComponentJSONProps["layer"]["props"];
  children?: ComponentJSONProps["layer"]["children"];
} => {
  const {
    metaData,
    layer: { props, style = {}, data },
    combinations,
    properties,
  } = json;

  let propsList: {
    key?: string;
    className?: string;
  } & ComponentJSONProps["layer"]["props"] = {};
  let childrenList: ComponentJSONProps["layer"]["children"] = [];
  const classNames: string[] = [metaData?.id || ""];

  createStyleObject({ ...style }, metaData?.id);

  Object.keys({ ...json?.metaData?.defaults, ...userProps }).forEach((prop) => {
    const propertyItem =
      Object.keys(properties || {}).find((item) => item === prop) || "";

    if (!propertyItem.length && combinations?.[prop]) {
      const {
        className,
        propsList: combinationProps,
        children: combinationsChildren,
      } = createCombinations(combinations, prop, userProps, json) || {
        className: "",
        propsList: {},
        children: [],
      };
      classNames.push(className);
      propsList = { ...propsList, ...combinationProps };
      childrenList = [...(childrenList || []), ...(combinationsChildren || [])];
    } else {
      const propObj =
        properties?.[propertyItem]?.[userProps?.[propertyItem || ""]] ||
        (json.properties || {})?.[propertyItem]?.[
          json?.metaData?.defaults?.[propertyItem] || ""
        ] ||
        {};

      const finalValaue =
        userProps?.[propertyItem] || json.metaData?.defaults?.[propertyItem];

      finalValaue &&
        createStyleObject(
          { ...(propObj?.layer || {})?.style },
          createCLassName(metaData?.id, propertyItem, finalValaue)
        );

      propsList = {
        ...propsList,
        ...props,
        ...(propObj?.layer || {}).props,
        key: metaData?.id || data?.control || "",
      };
      childrenList = updateChildprops(childrenList, propObj);
    }
  });

  return {
    props: { ...propsList, className: classNames.join(" ") },
    children: childrenList,
  };
};

export const createCombinations = (
  combinations: ComponentJSONProps["combinations"],
  item: string,
  userProps?: any,
  json?: ComponentJSONProps
):
  | {
      propsList?: ComponentJSONProps["layer"]["props"];
      className: string;
      children: ComponentJSONProps["layer"]["children"];
    }
  | undefined => {
  if (userProps[item] && combinations?.[item]) {
    const propKey =
      Object.keys(combinations?.[item][userProps[item]] || {})[0] || "";

    const propValue =
      userProps[propKey || ""] || json?.metaData?.defaults?.[propKey];
    const props =
      combinations?.[item]?.[userProps[item]]?.[propKey]?.[propValue];
    const allProps = props?.layer.props;
    const children = props?.layer.children;

    createStyleObject(
      props?.layer?.style,
      createCLassName(item, userProps[item], propKey),
      true
    );

    return {
      className: createCLassName(item, userProps[item], propKey),
      propsList: allProps,
      children,
    };
  }
};

export const updateChildprops = (
  children: ComponentJSONProps["layer"]["children"],
  propObj: ComponentJSONProps
) => {
  let childrenList: ComponentJSONProps["layer"]["children"] = [
    ...(children || []),
  ];
  childrenList = [
    ...(childrenList || []),
    ...((propObj && propObj.layer && propObj?.layer.children) || []),
  ];

  const updateChildren = (
    childList: ComponentJSONProps["layer"]["children"]
  ) => {
    childList?.forEach((child) => {
      createStyleObject(child.layer.style, child.metaData?.id, true);

      if (child.layer.children) {
        updateChildren(child.layer.children);
      }
    });
  };

  updateChildren(childrenList);
  return childrenList;
};
