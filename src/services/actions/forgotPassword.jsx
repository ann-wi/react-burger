import { FORGOT_PASSWORD } from "./constants";

export function forgotPassword(field, value) {
  return {
    type: FORGOT_PASSWORD,
    payload: { field, value },
  };
}
