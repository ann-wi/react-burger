import { SET_AUTH_CHECKED } from "../../../utils/constants";

export function setAuthChecked(check) {
  return {
    type: SET_AUTH_CHECKED,
    payload: { check },
  };
}
