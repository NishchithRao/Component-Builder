import Button from "./Button";
import React from "react";

export default {
  title: "atoms/button",
  component: Button,
};

export const basic = (args) => <Button {...args} />;

basic.args = {
  children: "Button",
};
