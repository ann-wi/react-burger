import OverlayStyles from "./overlay-styles.module.css";
import { FC } from "react";

export interface IModalOverlay {
  onClick: () => void;
}

export const ModalOverlay: FC<IModalOverlay> = ({ onClick }) => {
  return <div className={OverlayStyles.overlay} onClick={onClick}></div>;
};
