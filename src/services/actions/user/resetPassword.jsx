import { RESET_PASSWORD } from "../../../utils/constants";

export function resetPassword(password, code) {
  return {
    type: RESET_PASSWORD,
    payload: { password, code },
  };
}
