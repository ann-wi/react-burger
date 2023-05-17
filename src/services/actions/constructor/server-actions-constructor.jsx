import { checkResponse, apiBurger } from "../../../utils/server";
import { setCookie, getCookie } from "../../../utils/cookiesFunction";

import { SEND_REQUEST_INGREDIENTS } from "../../../utils/constants";
import { RESPOND_SUCCESS_INGREDIENTS } from "../../../utils/constants";
import { RESPOND_ERROR_INGREDIENTS } from "../../../utils/constants";
import { SEND_REQUEST_ORDER } from "../../../utils/constants";
import { RESPOND_SUCCESS_ORDER } from "../../../utils/constants";
import { RESPOND_ERROR_ORDER } from "../../../utils/constants";

import { SEND_REQUEST_REGISTER } from "../../../utils/constants";
import { RESPOND_SUCCESS_REGISTER } from "../../../utils/constants";
import { RESPOND_ERROR_REGISTER } from "../../../utils/constants";

import { SEND_REQUEST_LOGIN } from "../../../utils/constants";
import { RESPOND_SUCCESS_LOGIN } from "../../../utils/constants";
import { RESPOND_ERROR_LOGIN } from "../../../utils/constants";

import { SEND_REQUEST_USER } from "../../../utils/constants";
import { RESPOND_SUCCESS_USER } from "../../../utils/constants";
import { RESPOND_ERROR_USER } from "../../../utils/constants";

import { SEND_REQUEST_CHANGE_USER } from "../../../utils/constants";
import { RESPOND_SUCCESS_CHANGE_USER } from "../../../utils/constants";
import { RESPOND_ERROR_CHANGE_USER } from "../../../utils/constants";

import { SEND_REQUEST_FORGOT_PASSWORD } from "../../../utils/constants";
import { RESPOND_SUCCESS_FORGOT_PASSWORD } from "../../../utils/constants";
import { RESPOND_ERROR_FORGOT_PASSWORD } from "../../../utils/constants";

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

export function respondSuccessRegister(newUser, accessToken, refreshToken) {
  return {
    type: RESPOND_SUCCESS_REGISTER,
    payload: { newUser, accessToken, refreshToken },
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

export function respondSuccessLogin(user, accessToken, refreshToken) {
  return {
    type: RESPOND_SUCCESS_LOGIN,
    payload: { user, accessToken, refreshToken },
  };
}

export function respondErrorLogin(respondError) {
  return {
    type: RESPOND_ERROR_LOGIN,
    payload: { respondError },
  };
}

export function sendRequestUser(user) {
  return {
    type: SEND_REQUEST_USER,
    payload: { user },
  };
}

export function respondSuccessUser(user) {
  return {
    type: RESPOND_SUCCESS_USER,
    payload: { user },
  };
}

export function respondErrorUser(respondError) {
  return {
    type: RESPOND_ERROR_USER,
    payload: { respondError },
  };
}

export function sendRequestChangeUser(user) {
  return {
    type: SEND_REQUEST_CHANGE_USER,
    payload: { user },
  };
}

export function respondSuccessChangeUser(user) {
  return {
    type: RESPOND_SUCCESS_CHANGE_USER,
    payload: { user },
  };
}

export function respondErrorChangeUser(respondError) {
  return {
    type: RESPOND_ERROR_CHANGE_USER,
    payload: { respondError },
  };
}

export function sendRequestForgotPass(sendRequest) {
  return {
    type: SEND_REQUEST_FORGOT_PASSWORD,
    payload: { sendRequest },
  };
}

export function respondSuccessForgotPass(email) {
  return {
    type: RESPOND_SUCCESS_FORGOT_PASSWORD,
    payload: { email },
  };
}

export function respondErrorForgotPass(respondError) {
  return {
    type: RESPOND_ERROR_FORGOT_PASSWORD,
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
        if (data.success) {
          console.log(data.accessToken, data.refreshToken);
          setCookie("accessToken", data.accessToken.split("Bearer ")[1]);
          dispatch(
            respondSuccessRegister(
              data.user,
              data.accessToken,
              data.refreshToken
            )
          );
        }
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
        if (data.success) {
          console.log(data.accessToken, data.refreshToken);
          setCookie("accessToken", data.accessToken.split("Bearer ")[1]);
          dispatch(
            respondSuccessLogin(data.user, data.accessToken, data.refreshToken)
          );
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(info);
        dispatch(respondErrorLogin(true));
      });
  };
}

// GET USER PROFILE

export function getUserProfile() {
  return function (dispatch) {
    dispatch(sendRequestUser(true));

    fetch(`${apiBurger}auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
    })
      .then(checkResponse)
      .then((data) => {
        dispatch(respondSuccessUser(data.user));
        console.log(data);
        console.log(data.user);
      })
      .catch((err) => {
        console.log(err);
        dispatch(respondErrorUser(true));
      });
  };
}

//CHANGE USER INFO

export function changeUserInfo(info) {
  return function (dispatch) {
    dispatch(sendRequestChangeUser(true));

    fetch(`${apiBurger}auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({
        name: info.name,
        email: info.email,
        password: info.password,
      }),
    })
      .then(checkResponse)
      .then((data) => {
        dispatch(respondSuccessChangeUser(data.user));
      })
      .catch((err) => {
        console.log(err);
        console.log(info);
        dispatch(respondErrorChangeUser(true));
      });
  };
}

//FORGOT PASSWORD

export function forgotPasswordSendEmail(info) {
  return function (dispatch) {
    dispatch(sendRequestForgotPass(true));

    fetch(`https://norma.nomoreparties.space/api/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: info.email,
      }),
    })
      .then(checkResponse)
      .then((data) => {
        console.log(data);
        console.log(info);
        dispatch(respondSuccessForgotPass(info));
      })
      .catch((err) => {
        console.log(err);
        console.log(info);
        dispatch(respondErrorForgotPass(true));
      });
  };
}
