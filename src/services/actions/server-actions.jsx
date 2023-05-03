import { checkResponse } from "../../utils/serverResponse";
import { SEND_REQUEST_INGREDIENTS } from "./constants";
import { RESPOND_SUCCESS_INGREDIENTS } from "./constants";
import { RESPOND_ERROR_INGREDIENTS } from "./constants";
import { SEND_REQUEST_ORDER } from "./constants";
import { RESPOND_SUCCESS_ORDER } from "./constants";
import { RESPOND_ERROR_ORDER } from "./constants";

import { SEND_REQUEST_REGISTER } from "./constants";
import { RESPOND_SUCCESS_REGISTER } from "./constants";
import { RESPOND_ERROR_REGISTER } from "./constants";

import { SEND_REQUEST_LOGIN } from "./constants";
import { RESPOND_SUCCESS_LOGIN } from "./constants";
import { RESPOND_ERROR_LOGIN } from "./constants";

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

export function sendRequestRegister(sendRequest) {
  return {
    type: SEND_REQUEST_REGISTER,
    payload: { sendRequest },
  };
}

export function respondSuccessRegister(newUser) {
  return {
    type: RESPOND_SUCCESS_REGISTER,
    payload: { newUser },
  };
}

export function respondErrorRegister(respondError) {
  return {
    type: RESPOND_ERROR_REGISTER,
    payload: { respondError },
  };
}

export function sendRequestLogin(sendRequest) {
  return {
    type: SEND_REQUEST_LOGIN,
    payload: { sendRequest },
  };
}

export function respondSuccessLogin(user) {
  return {
    type: RESPOND_SUCCESS_LOGIN,
    payload: { user },
  };
}

export function respondErrorLogin(respondError) {
  return {
    type: RESPOND_ERROR_LOGIN,
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

//REGISTRATION

export function registerNewUser(info) {
  return function (dispatch) {
    dispatch(sendRequestRegister(true));

    fetch(`${apiBurger}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: info.email,
        password: info.password,
        name: info.name,
      }),
    })
      .then(checkResponse)
      .then((data) => {
        console.log(data);
        console.log(info);
        dispatch(respondSuccessRegister(data.user));
      })
      .catch((err) => {
        console.log(err);
        console.log(info);
        dispatch(respondErrorRegister(true));
      });
  };
}

//LOG IN

export function authUser(info) {
  return function (dispatch) {
    dispatch(sendRequestLogin(true));

    fetch(`${apiBurger}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: info.email,
        password: info.password,
      }),
    })
      .then(checkResponse)
      .then((data) => {
        console.log(data);
        console.log(info);
        dispatch(respondSuccessLogin(data.user));
      })
      .catch((err) => {
        console.log(err);
        console.log(info);
        dispatch(respondErrorLogin(true));
      });
  };
}
