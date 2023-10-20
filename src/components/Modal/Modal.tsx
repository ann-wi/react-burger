import React, { FC, ReactElement } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import ModalStyles from "./modal-styles.module.css";

export interface IModal {
  onCloseClick: () => void;
  children: ReactElement;
}

const popupContainer = document.querySelector("#popups") as HTMLInputElement;

export const Modal: FC<IModal> = ({ onCloseClick, children }) => {
  const handleEscKeydown = (event: KeyboardEvent) => {
    event.key === "Escape" && onCloseClick();
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleEscKeydown);

    return () => {
      document.removeEventListener("keydown", handleEscKeydown);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={ModalStyles.background}>
      <div className={ModalStyles.container}>
        <button className={ModalStyles.closeButton} type="button">
          <CloseIcon type="primary" onClick={onCloseClick} />
        </button>
        {children}
      </div>
      <ModalOverlay onClick={onCloseClick} />
    </div>,
    popupContainer
  );
};
