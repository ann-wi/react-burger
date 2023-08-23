import OverlayStyles from "./overlay-styles.module.css";
import PropTypes from "prop-types";

export const ModalOverlay = ({ onClick }) => {
  return <div className={OverlayStyles.overlay} onClick={onClick}></div>;
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func,
};
