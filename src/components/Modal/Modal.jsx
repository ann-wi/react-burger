import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ModalStyles from "./modal-styles.module.css";
import PropTypes from "prop-types";

const popupContainer = document.querySelector("#popups");

const Modal = ({ onCloseClick, children }) => {
  const handleEscKeydown = (event) => {
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

Modal.propTypes = {
  onCloseClick: PropTypes.func,
};

export default Modal;
