import { SUM_ORDER } from "../../../utils/constants";

export function sumOrder(total) {
  return {
    type: SUM_ORDER,
    payload: { total },
  };
}
