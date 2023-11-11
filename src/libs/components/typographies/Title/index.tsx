import { ComponentProps, FunctionComponent } from "react";
import { title } from "./Title.css";

export const Title: FunctionComponent<ComponentProps<"h1">> = (props) => (
  <h1 className={title} {...props} />
);
