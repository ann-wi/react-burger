import { LOGIN_USER } from "../../../utils/constants";

export function loginUser(user) {
  return {
    type: LOGIN_USER,
    payload: { user },
  };
}
