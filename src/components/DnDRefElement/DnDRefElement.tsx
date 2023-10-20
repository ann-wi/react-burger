import { FC, ReactElement } from "react";
import DnDRefElementStyles from "./DnDRefElement-style.module.css";

export interface IDnDRefElement {
  children: JSX.Element | JSX.Element[];
  dndRef: any;
}

export const DnDRefElement: FC<IDnDRefElement> = ({ children, dndRef }) => {
  return (
    <div className={DnDRefElementStyles.element} ref={dndRef}>
      {children}
    </div>
  );
};
