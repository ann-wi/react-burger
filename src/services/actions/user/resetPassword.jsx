import { RESET_PASSWORD } from "../../../utils/constants";

export function resetPassword(field, value) {
  return {
    type: RESET_PASSWORD,
    payload: { field, value },
  };
}
