import OverlayStyles from "./popup-overlay-styles.module.css";

const PopupOverlay = ({ onClick }) => {
  return <div className={OverlayStyles.overlay} onClick={onClick}></div>;
};

export default PopupOverlay;
