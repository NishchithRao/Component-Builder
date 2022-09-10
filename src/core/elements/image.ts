import React, { ReactElement } from 'react';
import { ComponentJSONProps } from '../customTypes';
import { getProperties } from '../properties';
import { createMethodsObject } from '../utils';

export const createImage = (
  json: ComponentJSONProps,
  userProps: any
): ReactElement | null => {
  const {
    layer: {
      data: { control = '', defaultValue } = { control: '', defaultValue: '' }
    }
  } = json;
  const { props } = getProperties(json, userProps);

  const imageProps = control ? userProps[control] : defaultValue;

  if (!imageProps) return null;
  return React.createElement('img', {
    ...props,
    ...createMethodsObject(json),
    key: props.key || json.metaData?.id,
    ...imageProps
  });
};
