import { getOrderNumber, checkResponse } from "../../utils/server";
import {
  SEND_REQUEST_ORDER_INFO,
  GET_ORDER_INFO_SUCCESS,
  GET_ORDER_INFO_ERROR,
} from "../../utils/constants";
import { AppDispatch } from "../../utils/storeTypes";
import { TOrder } from "../../utils/types";

export interface ISendRequestOrderInfo {
  readonly type: typeof SEND_REQUEST_ORDER_INFO;
  readonly sendRequest: boolean;
}

export interface IGetOrderInfoSuccess {
  readonly type: typeof GET_ORDER_INFO_SUCCESS;
  readonly orders: TOrder[];
}

export interface IGetOrderInfoError {
  readonly type: typeof GET_ORDER_INFO_ERROR;
  readonly respondError: boolean;
}

export type TOrderInfoActions =
  | ISendRequestOrderInfo
  | IGetOrderInfoSuccess
  | IGetOrderInfoError;

export function sendRequestOrderInfo(
  sendRequest: boolean
): ISendRequestOrderInfo {
  return {
    type: SEND_REQUEST_ORDER_INFO,
    sendRequest,
  };
}

export function getOrderInfoSuccess(orders: TOrder[]): IGetOrderInfoSuccess {
  return {
    type: GET_ORDER_INFO_SUCCESS,
    orders,
  };
}

export function getOrderInfoError(respondError: boolean): IGetOrderInfoError {
  return {
    type: GET_ORDER_INFO_ERROR,
    respondError,
  };
}

export function getOrderInfo(number: number) {
  return function (dispatch: AppDispatch) {
    dispatch(sendRequestOrderInfo(true));
    getOrderNumber(number)
      .then((res) => checkResponse(res))
      .then((res) => {
        if (res && res.success) {
          console.log(res);
          dispatch(getOrderInfoSuccess(res.orders));
        } else {
          dispatch(getOrderInfoError(true));
        }
      })
      .catch(() => {
        dispatch(getOrderInfoError(true));
      });
  };
}
