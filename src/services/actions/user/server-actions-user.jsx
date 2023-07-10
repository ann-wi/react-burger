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
import { setAuthChecked } from "./setAuthChecked";

export function sendRequestRegister(sendRequest) {
  return {
    type: SEND_REQUEST_REGISTER,
    payload: { sendRequest },
  };
}

export function respondSuccessRegister(data, accessToken, refreshToken) {
  return {
    type: RESPOND_SUCCESS_REGISTER,
    payload: { data, accessToken, refreshToken },
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

export function respondSuccessRefreshToken(success) {
  return {
    type: RESPOND_SUCCESS_REFRESH_TOKEN,
    payload: { success },
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
      .then((res) => {
        console.log(res);
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(respondSuccessLogin(res.user));
        dispatch(setAuthChecked(true));
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

function getUser() {
  return fetch(`${apiBurger}auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
  }).then((res) => checkResponse(res));
}

export function getUserProfile() {
  return function (dispatch) {
    dispatch(sendRequestUser(true));

    getUser()
      .then((res) => {
        if (res && res.success) {
          dispatch(respondSuccessUser(res.user));
        } else {
          dispatch(respondErrorUser(true));
        }
      })
      .catch((err) => {
        if (localStorage.getItem("refreshToken")) {
          dispatch(refreshUserToken());
        } else {
          dispatch(respondErrorUser(true));
        }
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

export function forgotPasswordSendEmail(email) {
  return function (dispatch) {
    dispatch(sendRequestForgotPass(true));

    fetch(`${apiBurger}password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then(checkResponse)
      .then((data) => {
        dispatch(respondSuccessForgotPass(email));
      })
      .catch((err) => {
        dispatch(respondErrorForgotPass(true));
      });
  };
}

// RESET PASSWORD

export function resetUserPassword(data) {
  return function (dispatch) {
    dispatch(sendRequestResetPass(true));

    fetch(`${apiBurger}password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: data.password,
        token: data.code,
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

function updateUserToken() {
  return fetch(`${apiBurger}auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then((res) => checkResponse(res));
}

export function refreshUserToken() {
  return function (dispatch) {
    dispatch(sendRequestRefreshToken(true));

    updateUserToken()
      .then((res) => {
        if (res && res.success) {
          console.log(res.accessToken);
          setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch(respondSuccessRefreshToken(true));
        } else {
          console.log("error refresh token");
          dispatch(respondErrorRefreshToken(true));
        }
      })
      .catch((err) => {
        dispatch(respondErrorRefreshToken(true));
      });
  };
}

/*
export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(respondSuccessUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};
*/
