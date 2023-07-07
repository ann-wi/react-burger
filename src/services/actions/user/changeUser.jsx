import { CHANGE_USER } from "../../../utils/constants";

export function changeUser(data) {
  return {
    type: CHANGE_USER,
    payload: { data },
  };
}
