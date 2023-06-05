import { CLOSE_MODAL } from "../../../utils/constants";

export function closeModal(openedModal) {
  return {
    type: CLOSE_MODAL,
    payload: { openedModal },
  };
}
