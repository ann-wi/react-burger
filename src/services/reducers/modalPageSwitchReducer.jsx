import { OPEN_MODAL, CLOSE_MODAL } from "../../utils/constants";

const initialState = {
  isOpened: false,
  modalType: "",
};

export const modalPageSwitchReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isOpened: true,
        modalType: action.payload.type,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isOpened: action.payload.isOpened,
        modalType: "",
      };
    default:
      return state;
  }
};
