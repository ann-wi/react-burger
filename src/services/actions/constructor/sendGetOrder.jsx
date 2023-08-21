import {
  GET_ORDER,
  GET_ORDER_ERROR,
  GET_ORDER_SUCCESS,
  SEND_ORDER,
  SEND_ORDER_ERROR,
  SEND_ORDER_SUCCESS,
} from "../../../utils/constants";
import { getCookie } from "../../../utils/cookies-storage";
import { apiBurger, checkResponse } from "../../../utils/server";

async function fetchRequest(url, options) {
  const res = await fetch(apiBurger + url, options);
  return checkResponse(res);
}

export const sendOrder = (data) => {
  return (dispatch) => {
    dispatch({
      type: SEND_ORDER,
    });
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
        dispatch({
          type: SEND_ORDER_SUCCESS,
          order: res.order,
          orderList: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: SEND_ORDER_ERROR,
          error: err.message,
        });
      });
  };
};

export const getOrders = (number) => {
  return (dispatch) => {
    dispatch({
      type: GET_ORDER,
    });
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
          dispatch({
            type: GET_ORDER_SUCCESS,
            orders: res.orders,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDER_ERROR,
          error: err.message,
        });
      });
  };
};

export const getAuthOrders = () => {
  return (dispatch) => {
    dispatch({
      type: GET_ORDER,
    });
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
          dispatch({
            type: GET_ORDER_SUCCESS,
            orders: res,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDER_ERROR,
          error: err.message,
        });
      });
  };
};
