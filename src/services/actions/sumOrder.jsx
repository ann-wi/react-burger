import { SUM_ORDER } from "./constants";

export function sumOrder(total) {
  return {
    type: SUM_ORDER,
    payload: { total },
  };
}
