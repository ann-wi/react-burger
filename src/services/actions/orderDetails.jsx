export function getOrderNumber(number) {
  return {
    type: "GET_ORDER_NUMBER",
    payload: { number },
  };
}
