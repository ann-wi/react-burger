import { getOrderNumber, checkResponse } from "../../../utils/server";

export const GET_ORDER_INFO = "GET_ORDER_INFO";
export const GET_ORDER_INFO_SUCCESS = "GET_ORDER_INFO_SUCCESS";
export const GET_ORDER_INFO_ERROR = "GET_ORDER_INFO_ERROR";

export function getOrderInfo(number) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_INFO,
    });
    getOrderNumber(number)
      .then((res) => checkResponse(res))
      .then((res) => {
        if (res && res.success) {
          console.log(res);
          dispatch({
            type: GET_ORDER_INFO_SUCCESS,
            orders: res.orders,
          });
        } else {
          dispatch({
            type: GET_ORDER_INFO_ERROR,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: GET_ORDER_INFO_ERROR,
        });
      });
  };
}
