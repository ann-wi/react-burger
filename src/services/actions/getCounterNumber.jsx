import { GET_COUNTER_NUMBER } from "./constants";

export function getCounterNumber(number) {
  return {
    type: GET_COUNTER_NUMBER,
    payload: { number },
  };
}
