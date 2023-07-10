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
} from "../../../utils/server";
import {
  setCookie,
  getCookie,
  saveToLocalStorage,
  getFromLocalStorage,
  deleteCookie,
  deleteFromLocalStorage,
} from "../../../utils/cookies-storage";

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

import { SET_AUTH_CHECKED } from "../../../utils/constants";
import { SET_USER } from "../../../utils/constants";
import { loginUser } from "./loginUser";

export function sendRequestRegister(sendRequest) {
  return {
    type: SEND_REQUEST_REGISTER,
    payload: { sendRequest },
  };
}

export function respondSuccessRegister(data) {
  return {
    type: RESPOND_SUCCESS_REGISTER,
    payload: { data },
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

export function respondSuccessLogout(user) {
  return {
    type: RESPOND_SUCCESS_LOGOUT,
    payload: { user },
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

export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

//////////////////////////////////////////REGISTRATION

export const registerNewUser = (info) => (dispatch) => {
  dispatch(sendRequestRegister(true));

  apiRegisterUser(info)
    .then((data) => {
      console.log(data);
      dispatch(respondSuccessRegister(data.user));
    })
    .catch((err) => {
      dispatch(respondErrorRegister(true));
    });
};

//////////////////////////////////////////LOG IN

export const authUser = (info) => (dispatch) => {
  dispatch(sendRequestLogin(true));

  apiAuthUser(info)
    .then((data) => {
      console.log(data);
      setCookie("accessToken", formatToken(data.accessToken), {
        expires: 60 * 15,
        path: "/",
      });
      saveToLocalStorage("refreshToken", data.refreshToken);
      dispatch(respondSuccessLogin(data.user));
      dispatch(loginUser(data.user));
    })
    .catch((err) => {
      dispatch(respondErrorLogin(true));
    });
};

////////////////////////////////////// LOG OUT

export const userLogout = () => (dispatch) => {
  dispatch(sendRequestLogout(true));
  fetchWithRefresh({ responce: apiLogoutUser, data: null })
    .then((res) => {
      console.log(res);
      deleteCookie("accessToken");
      deleteFromLocalStorage("refreshToken");
      dispatch(respondSuccessLogout(res.user));
    })
    .catch((err) => {
      dispatch(respondErrorLogout(true));
    });
};

///////////////////////////////////////// RELOGIN

export const reloginUser = () => (dispatch) => {
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

/////////////////////////////////////// GET USER PROFILE

export const getUser = () => (dispatch) => {
  dispatch(sendRequestUser(true));
  fetchWithRefresh({ responce: apiGetUser, data: null })
    .then((res) => {
      dispatch(respondSuccessLogin(res.user));
    })
    .catch((err) => {
      dispatch(respondErrorUser(true));
    });
};

////////////////////////////////////// CHANGE USER INFO

export const changeUserInfo = (info) => (dispatch) => {
  dispatch(sendRequestChangeUser(true));
  fetchWithRefresh({ responce: apiUpdateUserInfo, data: info })
    .then((res) => {
      dispatch(respondSuccessChangeUser(res.user));
    })
    .catch((err) => {
      dispatch(respondErrorChangeUser(true));
    });
};

//////////////////////////////////// FORGOT PASSWORD

//dispatch(respondSuccessForgotPass(email));

export const forgotPasswordSendEmail = (email) => (dispatch) => {
  dispatch(sendRequestForgotPass(true));
  apiForgotPassword(email)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      dispatch(respondErrorForgotPass(true));
    });
};

/////////////////////////////////// RESET PASSWORD

export const resetUserPassword = (data) => (dispatch) => {
  dispatch(sendRequestResetPass(true));
  apiResetPassword(data)
    .then((res) => {
      dispatch(respondSuccessResetPass(true));
    })
    .catch((err) => {
      dispatch(respondErrorResetPass(true));
    });
};
