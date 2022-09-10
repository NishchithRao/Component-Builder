import CarbonInput from "./Input";
import React from "react";

export default {
  title: "atoms/input",
  component: CarbonInput,
};

export const basic = (args) => <CarbonInput {...args} />;

basic.args = {
  label: "Name",
  helperText: "Enter full name",
  variants: "invalid",
};
