import {
  GET_ORDER,
  GET_ORDER_ERROR,
  GET_ORDER_SUCCESS,
  SEND_ORDER,
  SEND_ORDER_ERROR,
  SEND_ORDER_SUCCESS,
} from "../../utils/constants";
import { getCookie } from "../../utils/cookies-storage";
import { apiBurger, checkResponse } from "../../utils/server";
import { AppDispatch } from "../../utils/storeTypes";
import { TOrder } from "../../utils/types";

export interface ISendOrder {
  readonly type: typeof SEND_ORDER;
}

export interface ISendOrderSuccess {
  readonly type: typeof SEND_ORDER_SUCCESS;
  readonly order: TOrder;
  readonly orderList: any;
}

export interface ISendOrderError {
  readonly type: typeof SEND_ORDER_ERROR;
}

export interface IGetOrder {
  readonly type: typeof GET_ORDER;
}

export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly orders: TOrder[];
}

export interface IGetOrderError {
  readonly type: typeof GET_ORDER_ERROR;
}

export type TOrderActions =
  | ISendOrder
  | ISendOrderSuccess
  | ISendOrderError
  | IGetOrder
  | IGetOrderSuccess
  | IGetOrderError;

export function sendOrderRequest(): ISendOrder {
  return {
    type: SEND_ORDER,
  };
}

export function sendOrderSuccess(
  order: TOrder,
  orderList: any
): ISendOrderSuccess {
  return {
    type: SEND_ORDER_SUCCESS,
    order,
    orderList,
  };
}

export function sendOrderError(): ISendOrderError {
  return {
    type: SEND_ORDER_ERROR,
  };
}

export function getOrderRequest(): IGetOrder {
  return {
    type: GET_ORDER,
  };
}

export function getOrderSuccess(orders: TOrder[]): IGetOrderSuccess {
  return {
    type: GET_ORDER_SUCCESS,
    orders,
  };
}

export function getOrderError(): IGetOrderError {
  return {
    type: GET_ORDER_ERROR,
  };
}

async function fetchRequest(url: string, options?: any) {
  const res = await fetch(apiBurger + url, options);
  return checkResponse(res);
}

export const sendOrder = (data: any) => {
  return (dispatch: AppDispatch) => {
    dispatch(sendOrderRequest());
    const sendOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({ ingredients: data }),
    };
    fetchRequest(`orders`, sendOptions)
      .then((res) => {
        dispatch(sendOrderSuccess(res.order, data));
      })
      .catch((err) => {
        dispatch(sendOrderError());
      });
  };
};

export const getOrders = (number: number) => {
  return (dispatch: AppDispatch) => {
    dispatch(getOrderRequest());
    const getOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
    };
    fetchRequest(`orders/${number}`, getOptions)
      .then((res) => {
        if (res.success) {
          dispatch(getOrderSuccess(res.orders));
        }
      })
      .catch((err) => {
        dispatch(getOrderError());
      });
  };
};

export const getAuthOrders = () => {
  return (dispatch: AppDispatch) => {
    dispatch(getOrderRequest());
    const authOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
    };
    fetchRequest(`orders/`, authOptions)
      .then((res) => {
        if (res.success) {
          dispatch(getOrderSuccess(res));
        }
      })
      .catch((err) => {
        dispatch(getOrderError());
      });
  };
};
