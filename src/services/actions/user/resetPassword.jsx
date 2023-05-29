import { RESET_PASSWORD } from "../../../utils/constants";

export function resetPassword(token) {
  return {
    type: RESET_PASSWORD,
    payload: { token },
  };
}
