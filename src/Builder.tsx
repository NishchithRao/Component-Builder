import React from 'react';
import { ComponentJSONProps } from './core/customTypes';
import { createComponent } from './core';
import { createStyles, golbalStyles } from './core/styles';

/**
 * Create Components from JSON
 * @param json The JSON object
 * @returns React Component
 */
export const ComponentBuilder = (
  json: ComponentJSONProps
): ((userProps: any) => JSX.Element | null) => {
  return (userProps: any): JSX.Element | null => {
    return React.createElement('div', {}, [
      createComponent(json, userProps),
      React.createElement(
        'style',
        { key: `${json.metaData?.id}-styles` },
        createStyles(golbalStyles)
      )
    ]);
  };
};
