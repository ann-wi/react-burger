import {
  getCookie,
  saveToLocalStorage,
  setCookie,
  getFromLocalStorage,
} from "./cookies-storage";
import {
  TGetUser,
  TLoginUser,
  TResetPassword,
  TFetchWithRefresh,
} from "./types";

export const apiBurger = "https://norma.nomoreparties.space/api/";

export const formatToken = (accessToken: string) => {
  let authToken = accessToken.split("Bearer ")[1];
  return authToken;
};

export const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err: any) => Promise.reject(err));
};

export async function apiGetIngredients() {
  const res = await fetch(apiBurger + "ingredients");
  return checkResponse(res);
}

export async function apiSendOrder(data: (string | undefined)[]) {
  const res = await fetch(apiBurger + "orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({ ingredients: data }),
  });

  return checkResponse(res);
}

export function getOrderNumber(number: string) {
  return fetch(`${apiBurger}orders/${number}`);
}

// USER

export async function apiRegisterUser(data: TGetUser) {
  const res = await fetch(apiBurger + "auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      name: data.name,
    }),
  });

  return checkResponse(res);
}

export async function apiUpdateAccessToken() {
  const refToken = getFromLocalStorage("refreshToken");
  const res = await fetch(apiBurger + "auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refToken,
    }),
  });

  return checkResponse(res);
}

export async function apiAuthUser(data: TLoginUser) {
  const res = await fetch(apiBurger + "auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });

  return checkResponse(res);
}

export const refreshUserToken = () => {
  apiUpdateAccessToken()
    .then((res) => {
      setCookie("accessToken", formatToken(res.accessToken), {
        expires: 60 * 15,
        path: "/",
      });
      saveToLocalStorage("refreshToken", res.refreshToken);
    })
    .catch((err) => {
      console.log(err);
    });
};

export async function apiLogoutUser() {
  const res = await fetch(apiBurger + "auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({
      token: getFromLocalStorage("refreshToken"),
    }),
  });

  return checkResponse(res);
}

export async function apiGetUser() {
  const res = await fetch(apiBurger + "auth/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + getCookie("accessToken"),
    },
  });

  return checkResponse(res);
}

export async function apiUpdateUserInfo(data: TGetUser) {
  const res = await fetch(apiBurger + "auth/user", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      name: data.name,
    }),
  });

  return checkResponse(res);
}

export async function apiForgotPassword(email: string) {
  const res = await fetch(apiBurger + "password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  });

  return checkResponse(res);
}

export async function apiResetPassword(data: TResetPassword) {
  const res = await fetch(apiBurger + "password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: data.password,
      token: data.code,
    }),
  });

  return checkResponse(res);
}

export const fetchWithRefresh = async ({
  response,
  data,
}: TFetchWithRefresh) => {
  try {
    return await response(data!);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      console.log(err);
      return Promise.reject(err);
    }

    try {
      await apiUpdateAccessToken().then((res) => {
        setCookie("accessToken", formatToken(res.accessToken), {
          expires: 60 * 15,
          path: "/",
        });
        saveToLocalStorage("refreshToken", res.refreshToken);
      });

      return await response(data!);
    } catch (err) {
      return Promise.reject(err);
    }
  }
};
