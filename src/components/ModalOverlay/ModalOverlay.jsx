import OverlayStyles from "./overlay-styles.module.css";

const ModalOverlay = ({ onClick }) => {
  return <div className={OverlayStyles.overlay} onClick={onClick}></div>;
};

export default ModalOverlay;
