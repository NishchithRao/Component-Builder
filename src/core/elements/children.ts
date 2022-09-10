import { createComponent } from '../';
import { ComponentJSONProps } from '../customTypes';

export const getChildren = (
  children: ComponentJSONProps[] | undefined,
  userProps: any
): React.ReactNode[] | string | null => {
  if (children) {
    return (children as ComponentJSONProps[])?.map((child) =>
      createComponent({ ...child }, userProps)
    );
  }
  return null;
};
