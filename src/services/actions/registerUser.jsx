import { REGISTER_USER } from "./constants";

export function registerUser(field, value) {
  return {
    type: REGISTER_USER,
    payload: { field, value },
  };
}
