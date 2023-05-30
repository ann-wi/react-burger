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

import { SEND_REQUEST_RESET_PASSWORD } from "../../../utils/constants";
import { RESPOND_SUCCESS_RESET_PASSWORD } from "../../../utils/constants";
import { RESPOND_ERROR_RESET_PASSWORD } from "../../../utils/constants";

import { SEND_REQUEST_REFRESH_TOKEN } from "../../../utils/constants";
import { RESPOND_SUCCESS_REFRESH_TOKEN } from "../../../utils/constants";
import { RESPOND_ERROR_REFRESH_TOKEN } from "../../../utils/constants";

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

export function sendRequestResetPass(sendRequest) {
  return {
    type: SEND_REQUEST_RESET_PASSWORD,
    payload: { sendRequest },
  };
}

export function respondSuccessResetPass(success) {
  return {
    type: RESPOND_SUCCESS_RESET_PASSWORD,
    payload: { success },
  };
}

export function respondErrorResetPass(respondError) {
  return {
    type: RESPOND_ERROR_RESET_PASSWORD,
    payload: { respondError },
  };
}

export function sendRequestRefreshToken(sendRequest) {
  return {
    type: SEND_REQUEST_REFRESH_TOKEN,
    payload: { sendRequest },
  };
}

export function respondSuccessRefreshToken(access, refresh) {
  return {
    type: RESPOND_SUCCESS_REFRESH_TOKEN,
    payload: { access, refresh },
  };
}

export function respondErrorRefreshToken(respondError) {
  return {
    type: RESPOND_ERROR_REFRESH_TOKEN,
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
        setCookie("accessToken", data.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", data.refreshToken);
        dispatch(
          respondSuccessRegister(data.user, data.accessToken, data.refreshToken)
        );
      })
      .catch((err) => {
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
        setCookie("accessToken", data.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", data.refreshToken);
        dispatch(
          respondSuccessLogin(data.user, data.accessToken, data.refreshToken)
        );
      })
      .catch((err) => {
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
      })
      .catch((err) => {
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
        dispatch(respondSuccessForgotPass(info));
      })
      .catch((err) => {
        dispatch(respondErrorForgotPass(true));
      });
  };
}

// RESET PASSWORD

export function resetUserPassword(password, code) {
  return function (dispatch) {
    dispatch(sendRequestResetPass(true));

    fetch(`${apiBurger}password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        token: code,
      }),
    })
      .then(checkResponse)
      .then((data) => {
        dispatch(respondSuccessResetPass(true));
      })
      .catch((err) => {
        dispatch(respondErrorResetPass(true));
      });
  };
}

//REFRESH USER TOKEN

export function refreshUserToken() {
  return function (dispatch) {
    dispatch(sendRequestRefreshToken(true));

    fetch(`${apiBurger}auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: getCookie("refreshToken"),
      }),
    })
      .then(checkResponse)
      .then((data) => {
        setCookie("accessToken", data.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", data.refreshToken);
        dispatch(
          respondSuccessRefreshToken(data.accessToken, data.refreshToken)
        );
      })
      .catch((err) => {
        dispatch(respondErrorRefreshToken(true));
      });
  };
}
