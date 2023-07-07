import { REGISTER_USER } from "../../../utils/constants";

export function registerUser(data) {
  return {
    type: REGISTER_USER,
    payload: { data },
  };
}
