import { FORGOT_PASSWORD } from "../../../utils/constants";

export function forgotPassword(data) {
  return {
    type: FORGOT_PASSWORD,
    payload: { data },
  };
}
