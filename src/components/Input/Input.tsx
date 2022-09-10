import { ComponentBuilder } from "../../Builder";
import { ComponentJSONProps } from "../../core/customTypes";
import data from "./Input.json";

const CarbonInput = ComponentBuilder(data as ComponentJSONProps);

export default CarbonInput;
