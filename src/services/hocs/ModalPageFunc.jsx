import { useSelector } from "react-redux";
import Modal from "../../components/Modal/Modal";
//import PropTypes from "prop-types";

const ModalPageSwitch = ({ Popup, Page, modalName }) => {
  const { isOpened, modalType } = useSelector(
    (state) => state.modalPageSwitchReducer
  );

  return isOpened && modalType === modalName
    ? Popup && (
        <Modal>
          <Popup />
        </Modal>
      )
    : Page && <Page />;
};

/*
ModalPageSwitch.propTypes = {
  Popup: PropTypes.func.isRequired,
  Page: PropTypes.func.isRequired,
  modalName: PropTypes.string.isRequired,
};
*/

export default ModalPageSwitch;
