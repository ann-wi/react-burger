import { REGISTER_USER } from "../../utils/constants";

export function registerUser(field, value) {
  return {
    type: REGISTER_USER,
    payload: { field, value },
  };
}
