export type ComponentJSONProps = {
  metaData?: {
    id: string;
    name?: string;
    defaults?: { [key: string]: string };
  };
  layer: {
    type?: "box" | "text" | "image" | "custom";
    element?: string;
    props?: {
      [key: string]: any;
    };
    data?: {
      control?: string;
      defaultValue?: string;
    };
    style?: { [key: string]: string | number };
    children?: ComponentJSONProps[];
    methods?: {
      [name: string]: {
        arguments?: string;
        body: string;
      };
    };
  };
  properties?: {
    [propertyType: string]: {
      [propertyName: string]: ComponentJSONProps;
    };
  };
  combinations?: {
    [propertyType: string]: {
      [propertyName: string]: {
        [propertyReferenceName: string]: {
          [propertyReferenceValue: string]: ComponentJSONProps;
        };
      };
    };
  };
};
