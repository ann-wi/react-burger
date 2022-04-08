import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PopupOverlay from "../PopupOverlay/PopupOverlay";
import PopupStyles from "./popup-styles.module.css";
import PropTypes from "prop-types";

const popupContainer = document.querySelector("#popups");

const PopupIngredients = ({ onCloseClick, onEscKeydown, children }) => {
  React.useEffect(() => {
    document.addEventListener("keydown", onEscKeydown);

    return () => {
      document.removeEventListener("keydown", onEscKeydown);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={PopupStyles.background}>
        <div className={PopupStyles.container}>
          <button className={PopupStyles.closeButton} type="button">
            <CloseIcon type="primary" onClick={onCloseClick} />
          </button>
          {children}
        </div>
        <PopupOverlay onClick={onCloseClick} />
      </div>
    </>,
    popupContainer
  );
};

PopupIngredients.propTypes = {
  onCloseClick: PropTypes.func,
  onEscKeydown: PropTypes.func,
};

export default PopupIngredients;
