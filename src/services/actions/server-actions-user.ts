import {
  refreshUserToken,
  apiRegisterUser,
  apiAuthUser,
  formatToken,
  fetchWithRefresh,
  apiGetUser,
  apiLogoutUser,
  apiUpdateUserInfo,
  apiForgotPassword,
  apiResetPassword,
} from "../../utils/server";
import {
  setCookie,
  getCookie,
  saveToLocalStorage,
  getFromLocalStorage,
  deleteCookie,
  deleteFromLocalStorage,
} from "../../utils/cookies-storage";

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
import { AppDispatch } from "../../utils/storeTypes";

export interface ISendRequestRegister {
  readonly type: typeof SEND_REQUEST_REGISTER;
  readonly sendRequest: boolean;
}

export interface IRespondSuccessRegister {
  readonly type: typeof RESPOND_SUCCESS_REGISTER;
  readonly user: TUser;
}

export interface IRespondErrorRegister {
  readonly type: typeof RESPOND_ERROR_REGISTER;
  readonly respondError: boolean;
}

export interface ISendRequestLogin {
  readonly type: typeof SEND_REQUEST_LOGIN;
  readonly sendRequest: boolean;
}

export interface IRespondSuccessLogin {
  readonly type: typeof RESPOND_SUCCESS_LOGIN;
  readonly user: TUser;
}

export interface IRespondErrorLogin {
  readonly type: typeof RESPOND_ERROR_LOGIN;
  readonly respondError: boolean;
}

export interface ISendRequestUser {
  readonly type: typeof SEND_REQUEST_USER;
  readonly sendRequest: boolean;
}

export interface IRespondSuccessUser {
  readonly type: typeof RESPOND_SUCCESS_USER;
  readonly user: TUser;
}

export interface IRespondErrorUser {
  readonly type: typeof RESPOND_ERROR_USER;
  readonly respondError: boolean;
}

export interface ISendRequestChangeUser {
  readonly type: typeof SEND_REQUEST_CHANGE_USER;
  readonly sendRequest: boolean;
}

export interface IRespondSuccessChangeUser {
  readonly type: typeof RESPOND_SUCCESS_CHANGE_USER;
  readonly user: TUser;
}

export interface IRespondErrorChangeUser {
  readonly type: typeof RESPOND_ERROR_CHANGE_USER;
  readonly respondError: boolean;
}

export interface ISendRequestLogout {
  readonly type: typeof SEND_REQUEST_LOGOUT;
  readonly sendRequest: boolean;
}

export interface IRespondSuccessLogout {
  readonly type: typeof RESPOND_SUCCESS_LOGOUT;
  readonly user: boolean;
}

export interface IRespondErrorLogout {
  readonly type: typeof RESPOND_ERROR_LOGOUT;
  readonly respondError: boolean;
}

export interface ISendRequestForgotPass {
  readonly type: typeof SEND_REQUEST_FORGOT_PASSWORD;
  readonly sendRequest: boolean;
}

export interface IRespondSuccessForgotPass {
  readonly type: typeof RESPOND_SUCCESS_FORGOT_PASSWORD;
  readonly success: boolean;
}

export interface IRespondErrorForgotPass {
  readonly type: typeof RESPOND_ERROR_FORGOT_PASSWORD;
  readonly respondError: boolean;
}

export interface ISendRequestResetPass {
  readonly type: typeof SEND_REQUEST_RESET_PASSWORD;
  readonly sendRequest: boolean;
}

export interface IRespondSuccessResetPass {
  readonly type: typeof RESPOND_SUCCESS_RESET_PASSWORD;
  readonly success: boolean;
}

export interface IRespondErrorResetPass {
  readonly type: typeof RESPOND_ERROR_RESET_PASSWORD;
  readonly respondError: boolean;
}

export type TUserActions =
  | ISendRequestRegister
  | IRespondSuccessRegister
  | IRespondErrorRegister
  | ISendRequestLogin
  | IRespondSuccessLogin
  | IRespondErrorLogin
  | ISendRequestUser
  | IRespondSuccessUser
  | IRespondErrorUser
  | ISendRequestChangeUser
  | IRespondSuccessChangeUser
  | IRespondErrorChangeUser
  | ISendRequestLogout
  | IRespondSuccessLogout
  | IRespondErrorLogout
  | ISendRequestForgotPass
  | IRespondSuccessForgotPass
  | IRespondErrorForgotPass
  | ISendRequestResetPass
  | IRespondSuccessResetPass
  | IRespondErrorResetPass;

export function sendRequestRegister(
  sendRequest: boolean
): ISendRequestRegister {
  return {
    type: SEND_REQUEST_REGISTER,
    sendRequest,
  };
}

export function respondSuccessRegister(user: TUser): IRespondSuccessRegister {
  return {
    type: RESPOND_SUCCESS_REGISTER,
    user,
  };
}

export function respondErrorRegister(
  respondError: boolean
): IRespondErrorRegister {
  return {
    type: RESPOND_ERROR_REGISTER,
    respondError,
  };
}

export function sendRequestLogin(sendRequest: boolean): ISendRequestLogin {
  return {
    type: SEND_REQUEST_LOGIN,
    sendRequest,
  };
}

export function respondSuccessLogin(user: TUser): IRespondSuccessLogin {
  return {
    type: RESPOND_SUCCESS_LOGIN,
    user,
  };
}

export function respondErrorLogin(respondError: boolean): IRespondErrorLogin {
  return {
    type: RESPOND_ERROR_LOGIN,
    respondError,
  };
}

export function sendRequestUser(sendRequest: boolean): ISendRequestUser {
  return {
    type: SEND_REQUEST_USER,
    sendRequest,
  };
}

export function respondSuccessUser(user: TUser): IRespondSuccessUser {
  return {
    type: RESPOND_SUCCESS_USER,
    user,
  };
}

export function respondErrorUser(respondError: boolean): IRespondErrorUser {
  return {
    type: RESPOND_ERROR_USER,
    respondError,
  };
}

export function sendRequestChangeUser(
  sendRequest: boolean
): ISendRequestChangeUser {
  return {
    type: SEND_REQUEST_CHANGE_USER,
    sendRequest,
  };
}

export function respondSuccessChangeUser(
  user: TUser
): IRespondSuccessChangeUser {
  return {
    type: RESPOND_SUCCESS_CHANGE_USER,
    user,
  };
}

export function respondErrorChangeUser(
  respondError: boolean
): IRespondErrorChangeUser {
  return {
    type: RESPOND_ERROR_CHANGE_USER,
    respondError,
  };
}

export function sendRequestLogout(sendRequest: boolean): ISendRequestLogout {
  return {
    type: SEND_REQUEST_LOGOUT,
    sendRequest,
  };
}

export function respondSuccessLogout(user: boolean): IRespondSuccessLogout {
  return {
    type: RESPOND_SUCCESS_LOGOUT,
    user,
  };
}

export function respondErrorLogout(respondError: boolean): IRespondErrorLogout {
  return {
    type: RESPOND_ERROR_LOGOUT,
    respondError,
  };
}

export function sendRequestForgotPass(
  sendRequest: boolean
): ISendRequestForgotPass {
  return {
    type: SEND_REQUEST_FORGOT_PASSWORD,
    sendRequest,
  };
}

export function respondSuccessForgotPass(
  success: boolean
): IRespondSuccessForgotPass {
  return {
    type: RESPOND_SUCCESS_FORGOT_PASSWORD,
    success,
  };
}

export function respondErrorForgotPass(
  respondError: boolean
): IRespondErrorForgotPass {
  return {
    type: RESPOND_ERROR_FORGOT_PASSWORD,
    respondError,
  };
}

export function sendRequestResetPass(
  sendRequest: boolean
): ISendRequestResetPass {
  return {
    type: SEND_REQUEST_RESET_PASSWORD,
    sendRequest,
  };
}

export function respondSuccessResetPass(
  success: boolean
): IRespondSuccessResetPass {
  return {
    type: RESPOND_SUCCESS_RESET_PASSWORD,
    success,
  };
}

export function respondErrorResetPass(
  respondError: boolean
): IRespondErrorResetPass {
  return {
    type: RESPOND_ERROR_RESET_PASSWORD,
    respondError,
  };
}

// REGISTRATION

export const registerNewUser = (info: any) => (dispatch: AppDispatch) => {
  dispatch(sendRequestRegister(true));

  apiRegisterUser(info)
    .then((data) => {
      dispatch(respondSuccessRegister(data.user));
      dispatch(respondSuccessLogin(data.user));
    })
    .catch((err) => {
      dispatch(respondErrorRegister(true));
    });
};

// LOG IN

export const authUser = (info: any) => (dispatch: AppDispatch) => {
  dispatch(sendRequestLogin(true));

  apiAuthUser(info)
    .then((data) => {
      setCookie("accessToken", formatToken(data.accessToken), {
        expires: 60 * 15,
        path: "/",
      });
      saveToLocalStorage("refreshToken", data.refreshToken);
      dispatch(respondSuccessLogin(data.user));
    })
    .catch((err) => {
      dispatch(respondErrorLogin(true));
    });
};

// LOG OUT

export const userLogout = () => (dispatch: AppDispatch) => {
  dispatch(sendRequestLogout(true));
  fetchWithRefresh({ responce: apiLogoutUser, data: null })
    .then((res) => {
      deleteCookie("accessToken");
      deleteFromLocalStorage("refreshToken");
      dispatch(respondSuccessLogout(res.user));
    })
    .catch((err) => {
      dispatch(respondErrorLogout(true));
    });
};

// GET USER PROFILE

export const getUser = () => (dispatch: AppDispatch) => {
  dispatch(sendRequestUser(true));
  fetchWithRefresh({ responce: apiGetUser, data: null })
    .then((res) => {
      dispatch(respondSuccessLogin(res.user));
    })
    .catch((err) => {
      dispatch(respondErrorUser(true));
    });
};

// CHANGE USER INFO

export const changeUserInfo = (info: any) => (dispatch: AppDispatch) => {
  dispatch(sendRequestChangeUser(true));
  fetchWithRefresh({ responce: apiUpdateUserInfo, data: info })
    .then((res) => {
      dispatch(respondSuccessChangeUser(res.user));
    })
    .catch((err) => {
      dispatch(respondErrorChangeUser(true));
    });
};

// FORGOT PASSWORD

export const forgotPasswordSendEmail =
  (email: string) => (dispatch: AppDispatch) => {
    dispatch(sendRequestForgotPass(true));
    apiForgotPassword(email)
      .then((res) => {
        dispatch(respondSuccessForgotPass(true));
      })
      .catch((err) => {
        dispatch(respondErrorForgotPass(true));
      });
  };

// RESET PASSWORD

export const resetUserPassword = (data: any) => (dispatch: AppDispatch) => {
  dispatch(sendRequestResetPass(true));
  apiResetPassword(data)
    .then((res) => {
      dispatch(respondSuccessResetPass(true));
    })
    .catch((err) => {
      dispatch(respondErrorResetPass(true));
    });
};

// RELOGIN

export const reloginUser = () => (dispatch: AppDispatch) => {
  const localStorageToken = getFromLocalStorage("refreshToken");
  const accessCookie = getCookie("accessToken");

  if (localStorageToken && !accessCookie) {
    refreshUserToken();

    fetchWithRefresh({ responce: apiGetUser, data: null })
      .then((res) => {
        dispatch(respondSuccessLogin(res.user));
      })
      .catch((err) => {
        console.log("No user", err);
      });
  }

  if (localStorageToken && accessCookie) {
    fetchWithRefresh({ responce: apiGetUser, data: null })
      .then((res) => {
        dispatch(respondSuccessLogin(res.user));
      })
      .catch((err) => {
        console.log("No user", err);
      });
  }
};
