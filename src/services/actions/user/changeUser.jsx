import { CHANGE_USER } from "../../../utils/constants";

export function changeUser(field, value) {
  return {
    type: CHANGE_USER,
    payload: { field, value },
  };
}
