import { FORGOT_PASSWORD } from "../../../utils/constants";

export function forgotPassword(email) {
  return {
    type: FORGOT_PASSWORD,
    payload: { email },
  };
}
