import React from "react";
import { ComponentBuilder } from "../../Builder";
import { ComponentJSONProps } from "../../core/customTypes";
import data from "./Button.json";

const Button: React.FC = ComponentBuilder(data as ComponentJSONProps);

Button.displayName = "Button";

export default Button;
