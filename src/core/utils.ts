import { ComponentJSONProps } from './customTypes';

export const createCLassName = (
  base?: string,
  type?: string,
  value?: string
): string => `${base}-${type}-${value}`;

export const createMethodsObject = (
  json: ComponentJSONProps
): { [name: string]: Function } => {
  const fnList: { [name: string]: any } = {};

  Object.entries(json.layer.methods || {}).forEach(
    ([name, { arguments: args, body }]) => {
      // eslint-disable-next-line
      const fn = new Function(args || '', body);

      fnList[name] = fn;
    }
  );
  return fnList;
};
