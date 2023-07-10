import { REGISTER_USER } from "../../utils/constants";
import { SEND_REQUEST_REGISTER } from "../../utils/constants";
import { RESPOND_SUCCESS_REGISTER } from "../../utils/constants";
import { RESPOND_ERROR_REGISTER } from "../../utils/constants";

import { LOGIN_USER } from "../../utils/constants";
import { SEND_REQUEST_LOGIN } from "../../utils/constants";
import { RESPOND_SUCCESS_LOGIN } from "../../utils/constants";
import { RESPOND_ERROR_LOGIN } from "../../utils/constants";

import { SEND_REQUEST_USER } from "../../utils/constants";
import { RESPOND_SUCCESS_USER } from "../../utils/constants";
import { RESPOND_ERROR_USER } from "../../utils/constants";

import { SET_AUTH_CHECKED } from "../../utils/constants";

import { CHANGE_USER } from "../../utils/constants";
import { SEND_REQUEST_CHANGE_USER } from "../../utils/constants";
import { RESPOND_SUCCESS_CHANGE_USER } from "../../utils/constants";
import { RESPOND_ERROR_CHANGE_USER } from "../../utils/constants";

import { LOGOUT_USER } from "../../utils/constants";
import { SEND_REQUEST_LOGOUT } from "../../utils/constants";
import { RESPOND_SUCCESS_LOGOUT } from "../../utils/constants";
import { RESPOND_ERROR_LOGOUT } from "../../utils/constants";

import { FORGOT_PASSWORD } from "../../utils/constants";
import { SEND_REQUEST_FORGOT_PASSWORD } from "../../utils/constants";
import { RESPOND_SUCCESS_FORGOT_PASSWORD } from "../../utils/constants";
import { RESPOND_ERROR_FORGOT_PASSWORD } from "../../utils/constants";

import { RESET_PASSWORD } from "../../utils/constants";
import { SEND_REQUEST_RESET_PASSWORD } from "../../utils/constants";
import { RESPOND_SUCCESS_RESET_PASSWORD } from "../../utils/constants";
import { RESPOND_ERROR_RESET_PASSWORD } from "../../utils/constants";

import { SEND_REQUEST_REFRESH_TOKEN } from "../../utils/constants";
import { RESPOND_SUCCESS_REFRESH_TOKEN } from "../../utils/constants";
import { RESPOND_ERROR_REFRESH_TOKEN } from "../../utils/constants";

const initialState = {
  user: null,
  accessToken: "",
  refreshToken: "",
  isAuthChecked: false,
  userIsAuthorized: false,
  newPassSuccess: false,
  pendingNewPass: false,
  userIsValid: false,
  sendRequestRegister: false,
  respondErrorRegister: false,
  sendRequestLogin: false,
  respondErrorLogin: false,
  sendRequestLogout: false,
  respondErrorLogout: false,
  sendRequestUser: false,
  respondErrorUser: false,
  sendRequestForgotPass: false,
  respondErrorForgotPass: false,
  sendRequestResetPass: false,
  respondErrorResetPass: false,
  sendRequestUpdateToken: false,
  respondErrorUpdateToken: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        user: action.payload.data,
      };
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    case CHANGE_USER:
      return {
        ...state,
        user: action.payload.data,
      };
    case LOGOUT_USER:
      return {
        ...state,
        userIsAuthorized: false,
      };
    case FORGOT_PASSWORD:
      return {
        ...state,
        user: action.payload.data,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        code: action.payload.code,
      };
    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload.check,
      };
    case SEND_REQUEST_REGISTER:
      return {
        ...state,
        sendRequestRegister: true,
      };
    case RESPOND_SUCCESS_REGISTER:
      return {
        ...state,
        user: action.payload.data,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        userIsAuthorized: true,
        sendRequestRegister: false,
        respondErrorRegister: false,
      };
    case RESPOND_ERROR_REGISTER:
      return {
        ...state,
        sendRequestRegister: false,
        respondErrorRegister: true,
      };
    case SEND_REQUEST_LOGIN:
      return {
        ...state,
        sendRequestLogin: true,
      };
    case RESPOND_SUCCESS_LOGIN:
      return {
        ...state,
        user: action.payload.user,
        isAuthChecked: true,
        sendRequestLogin: false,
        respondErrorLogin: false,
      };
    case RESPOND_ERROR_LOGIN:
      return {
        ...state,
        sendRequestLogin: false,
        respondErrorLogin: true,
      };
    case SEND_REQUEST_LOGOUT:
      return {
        ...state,
        sendRequestLogout: true,
      };
    case RESPOND_SUCCESS_LOGOUT:
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        sendRequestLogout: false,
        respondErrorLogout: false,
      };
    case RESPOND_ERROR_LOGOUT:
      return {
        ...state,
        sendRequestLogout: false,
        respondErrorLogin: true,
      };
    case SEND_REQUEST_USER:
      return {
        ...state,
        sendRequestUser: true,
      };
    case RESPOND_SUCCESS_USER:
      return {
        ...state,
        user: action.payload.user,
        sendRequestUser: false,
        respondErrorUser: false,
      };
    case RESPOND_ERROR_USER:
      return {
        ...state,
        sendRequestLogin: false,
        respondErrorLogin: true,
      };
    case SEND_REQUEST_CHANGE_USER:
      return {
        ...state,
        sendRequestChangeUser: true,
      };
    case RESPOND_SUCCESS_CHANGE_USER:
      return {
        ...state,
        user: action.payload.data,
        sendRequestChangeUser: false,
        respondErrorChangeUser: false,
      };
    case RESPOND_ERROR_CHANGE_USER:
      return {
        ...state,
        sendRequestChangeUser: false,
        respondErrorChangeUser: true,
      };

    case SEND_REQUEST_FORGOT_PASSWORD:
      return {
        ...state,
        sendRequestForgotPass: true,
      };
    case RESPOND_SUCCESS_FORGOT_PASSWORD:
      return {
        ...state,
        sendRequestForgotPass: false,
        respondErrorForgotPass: false,
        userIsValid: true,
      };
    case RESPOND_ERROR_FORGOT_PASSWORD:
      return {
        ...state,
        sendRequestForgotPass: false,
        respondErrorForgotPass: true,
      };
    case SEND_REQUEST_RESET_PASSWORD:
      return {
        ...state,
        sendRequestResetPass: true,
      };
    case RESPOND_SUCCESS_RESET_PASSWORD:
      return {
        ...state,
        newPassSuccess: true,
        pendingNewPass: false,
        sendRequestResetPass: false,
        respondErrorResetPass: false,
      };
    case RESPOND_ERROR_RESET_PASSWORD:
      return {
        ...state,
        sendRequestResetPass: false,
        respondErrorResetPass: true,
      };
    case SEND_REQUEST_REFRESH_TOKEN:
      return {
        ...state,
        sendRequestUpdateToken: true,
      };
    case RESPOND_SUCCESS_REFRESH_TOKEN:
      return {
        ...state,
        sendRequestUpdateToken: false,
        respondErrorUpdateToken: false,
      };
    case RESPOND_ERROR_REFRESH_TOKEN:
      return {
        ...state,
        sendRequestUpdateToken: false,
        respondErrorUpdateToken: true,
      };
    default:
      return state;
  }
};
