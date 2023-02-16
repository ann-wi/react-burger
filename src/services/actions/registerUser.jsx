import { REGISTER_USER } from "./constants";

export function registerUser(info) {
  return {
    type: REGISTER_USER,
    payload: { info },
  };
}
