import { checkResponse, apiBurger } from "../../../utils/server";
import { setCookie, getCookie } from "../../../utils/cookiesFunction";

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

import { SEND_REQUEST_LOGOUT } from "../../../utils/constants";
import { RESPOND_SUCCESS_LOGOUT } from "../../../utils/constants";
import { RESPOND_ERROR_LOGOUT } from "../../../utils/constants";

import { SEND_REQUEST_FORGOT_PASSWORD } from "../../../utils/constants";
import { RESPOND_SUCCESS_FORGOT_PASSWORD } from "../../../utils/constants";
import { RESPOND_ERROR_FORGOT_PASSWORD } from "../../../utils/constants";

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

export function sendRequestLogout(user) {
  return {
    type: SEND_REQUEST_LOGOUT,
    payload: { user },
  };
}

export function respondSuccessLogout(user, accessToken, refreshToken) {
  return {
    type: RESPOND_SUCCESS_LOGOUT,
    payload: { user, accessToken, refreshToken },
  };
}

export function respondErrorLogout(respondError) {
  return {
    type: RESPOND_ERROR_LOGOUT,
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
        console.log(data.accessToken, data.refreshToken);
        setCookie("accessToken", data.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", data.refreshToken);
        dispatch(
          respondSuccessRegister(data.user, data.accessToken, data.refreshToken)
        );
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
        console.log(data.accessToken, data.refreshToken);
        setCookie("accessToken", data.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", data.refreshToken);
        dispatch(
          respondSuccessLogin(data.user, data.accessToken, data.refreshToken)
        );
      })
      .catch((err) => {
        console.log(err);
        console.log(info);
        dispatch(respondErrorLogin(true));
      });
  };
}

// LOG OUT

export function logoutUser() {
  return function (dispatch) {
    dispatch(sendRequestLogout(true));

    fetch(`${apiBurger}auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: getCookie("refreshToken"),
      }),
    })
      .then(checkResponse)
      .then(() => {
        setCookie("accessToken", "");
        setCookie("refreshToken", "");
        dispatch(respondSuccessLogout({}, "", ""));
      })
      .catch((err) => {
        console.log(err);
        console.log();
        dispatch(respondErrorLogout(true));
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
