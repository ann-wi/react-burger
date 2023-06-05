import { OPEN_MODAL } from "../../../utils/constants";

export function openModal(type) {
  return {
    type: OPEN_MODAL,
    payload: { type },
  };
}
