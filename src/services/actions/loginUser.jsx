import { LOGIN_USER } from "../../utils/constants";

export function loginUser(field, value) {
  return {
    type: LOGIN_USER,
    payload: { field, value },
  };
}
