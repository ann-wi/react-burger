/*
import {
  checkResponse,
  apiBurger,
  apiGetIngredients,
  apiSendOrder,
} from "../../../utils/server";

import { SEND_REQUEST_INGREDIENTS } from "../../../utils/constants";
import { RESPOND_SUCCESS_INGREDIENTS } from "../../../utils/constants";
import { RESPOND_ERROR_INGREDIENTS } from "../../../utils/constants";
import { SEND_REQUEST_ORDER } from "../../../utils/constants";
import { RESPOND_SUCCESS_ORDER } from "../../../utils/constants";
import { RESPOND_ERROR_ORDER } from "../../../utils/constants";

export function sendRequestIngredients(sendRequest) {
  return {
    type: SEND_REQUEST_INGREDIENTS,
    payload: { sendRequest },
  };
}

export function respondSuccessIngredients(ingredients) {
  return {
    type: RESPOND_SUCCESS_INGREDIENTS,
    payload: { ingredients },
  };
}

export function respondErrorIngredients(respondError) {
  return {
    type: RESPOND_ERROR_INGREDIENTS,
    payload: { respondError },
  };
}

export function sendRequestOrder(sendRequest) {
  return {
    type: SEND_REQUEST_ORDER,
    payload: { sendRequest },
  };
}

export function respondSuccessOrder(number) {
  return {
    type: RESPOND_SUCCESS_ORDER,
    payload: { number },
  };
}

export function respondErrorOrder(respondError) {
  return {
    type: RESPOND_ERROR_ORDER,
    payload: { respondError },
  };
}

export function getIngredients() {
  return function (dispatch) {
    dispatch(sendRequestIngredients(true));

    apiGetIngredients()
      .then((data) => {
        data.data.forEach((item) => {
          item.counter = 0;
        });
        dispatch(respondSuccessIngredients(data.data));
      })
      .catch((err) => {
        dispatch(respondErrorIngredients(true));
      });
  };
}

export function getOrderNumber(ingredientsIds) {
  return function (dispatch) {
    dispatch(sendRequestOrder(true));

    apiSendOrder(ingredientsIds)
      .then((data) => {
        dispatch(respondSuccessOrder(data.order.number));
      })
      .catch((err) => {
        dispatch(respondErrorOrder(true));
      });
  };
}
*/
