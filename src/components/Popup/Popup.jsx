import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PopupOverlay from "../PopupOverlay/PopupOverlay";

const popupContainer = document.querySelector("#popups");

const Popup = ({ onCloseClick, onEscKeydown, children }) => {
  React.useEffect(() => {
    document.addEventListener("keydown", onEscKeydown);

    return () => {
      document.removeEventListener("keydown", onEscKeydown);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div>
        <button type="button">
          <CloseIcon type="primary" onClick={onCloseClick} />
        </button>
        {children}
      </div>
      <PopupOverlay onClick={onCloseClick} />
    </>,
    popupContainer
  );
};

export default Popup;
