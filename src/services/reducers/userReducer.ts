import {
  SEND_REQUEST_REGISTER,
  RESPOND_SUCCESS_REGISTER,
  RESPOND_ERROR_REGISTER,
  SEND_REQUEST_LOGIN,
  RESPOND_SUCCESS_LOGIN,
  RESPOND_ERROR_LOGIN,
  SEND_REQUEST_USER,
  RESPOND_SUCCESS_USER,
  RESPOND_ERROR_USER,
  SEND_REQUEST_CHANGE_USER,
  RESPOND_SUCCESS_CHANGE_USER,
  RESPOND_ERROR_CHANGE_USER,
  SEND_REQUEST_LOGOUT,
  RESPOND_SUCCESS_LOGOUT,
  RESPOND_ERROR_LOGOUT,
  SEND_REQUEST_FORGOT_PASSWORD,
  RESPOND_SUCCESS_FORGOT_PASSWORD,
  RESPOND_ERROR_FORGOT_PASSWORD,
  SEND_REQUEST_RESET_PASSWORD,
  RESPOND_SUCCESS_RESET_PASSWORD,
  RESPOND_ERROR_RESET_PASSWORD,
} from "../../utils/constants";
import { TUser } from "../../utils/types";
import { TUserActions } from "../actions/user/server-actions-user";

type TUserState = {
  user: TUser | null;
  userIsAuthorized: boolean;
  newPassSuccess: boolean;
  pendingNewPass: boolean;
  userIsValid: boolean;
  sendRequestRegister: boolean;
  respondErrorRegister: boolean;
  sendRequestLogin: boolean;
  respondErrorLogin: boolean;
  sendRequestLogout: boolean;
  respondErrorLogout: boolean;
  sendRequestUser: boolean;
  respondErrorUser: boolean;
  sendRequestForgotPass: boolean;
  respondErrorForgotPass: boolean;
  sendRequestResetPass: boolean;
  respondErrorResetPass: boolean;
  sendRequestUpdateToken: boolean;
  respondErrorUpdateToken: boolean;
  sendRequestChangeUser: boolean;
  respondErrorChangeUser: boolean;
};

const initialState: TUserState = {
  user: null,
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
  sendRequestChangeUser: false,
  respondErrorChangeUser: false,
};

export const userReducer = (
  state = initialState,
  action: TUserActions
): TUserState => {
  switch (action.type) {
    case SEND_REQUEST_REGISTER:
      return {
        ...state,
        sendRequestRegister: true,
      };
    case RESPOND_SUCCESS_REGISTER:
      return {
        ...state,
        user: action.user,
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
        user: action.user,
        userIsAuthorized: true,
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
      return initialState;
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
        user: action.user,
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
        user: action.user,
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
    default:
      return state;
  }
};
