import {
  getCookie,
  saveToLocalStorage,
  setCookie,
  getFromLocalStorage,
} from "./cookies-storage";

export const apiBurger = "https://norma.nomoreparties.space/api/";

export const formatToken = (accessToken) => {
  let authToken = accessToken.split("Bearer ")[1];
  return authToken;
};

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => Promise.reject(err));
}

export async function apiGetIngredients() {
  const res = await fetch(apiBurger + "ingredients");
  return checkResponse(res);
}

export async function apiSendOrder(data) {
  const res = await fetch(apiBurger + "orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({ ingredients: data }),
  });

  console.log(data);
  return checkResponse(res);
}

// USER

export async function apiRegisterUser(data) {
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

export async function apiAuthUser(data) {
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

export async function apiUpdateUserInfo(data) {
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

export async function apiForgotPassword(email) {
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

export async function apiResetPassword(data) {
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

export const fetchWithRefresh = async ({ responce, data }) => {
  try {
    return await responce(data);
  } catch (err) {
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

      return await responce(data);
    } catch (err) {
      return Promise.reject(err);
    }
  }
};
