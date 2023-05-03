import { LOGIN_USER } from "./constants";

export function loginUser(field, value) {
  return {
    type: LOGIN_USER,
    payload: { field, value },
  };
}
