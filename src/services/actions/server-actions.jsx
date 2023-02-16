import { checkResponse } from "../../utils/serverResponse";
import { SEND_REQUEST_INGREDIENTS } from "./constants";
import { RESPOND_SUCCESS_INGREDIENTS } from "./constants";
import { RESPOND_ERROR_INGREDIENTS } from "./constants";
import { SEND_REQUEST_ORDER } from "./constants";
import { RESPOND_SUCCESS_ORDER } from "./constants";
import { RESPOND_ERROR_ORDER } from "./constants";

const apiBurger = "https://norma.nomoreparties.space/api/";

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

    fetch(`${apiBurger}ingredients`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(checkResponse)
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

    fetch(`${apiBurger}orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredientsIds,
      }),
    })
      .then(checkResponse)
      .then((data) => {
        dispatch(respondSuccessOrder(data.order.number));
      })
      .catch((err) => {
        dispatch(respondErrorOrder(true));
      });
  };
}

//Server 9-1
export function registerUserApi(regFormInfo) {
  return function (dispatch) {
    fetch(`${apiBurger}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: regFormInfo.email,
        password: regFormInfo.password,
        name: regFormInfo.name,
      }),
    })
      .then(checkResponse)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(`error: ${err}`);
      });
  };
}
