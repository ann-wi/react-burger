import { LOGIN_USER } from "../../../utils/constants";

export function loginUser(data) {
  return {
    type: LOGIN_USER,
    payload: { data },
  };
}
