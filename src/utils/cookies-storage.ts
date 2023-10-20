// Cookies
export type TSetCookieProps = {
  [key: string]: any | {};
};

export function setCookie(
  name: string,
  value: string | number | boolean,
  props?: TSetCookieProps
) {
  props = {
    path: "/",
    ...props,
  };
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const deleteCookie = (name: string) => {
  setCookie(name, "", { expires: -1, path: "/" });
};

// LocalStorage

export const saveToLocalStorage = (name: string, data: string) => {
  localStorage.setItem(name, data);
};

export const getFromLocalStorage = (name: string) => {
  const myData = localStorage.getItem(name);
  return myData;
};

export const deleteFromLocalStorage = (name: string) => {
  localStorage.removeItem(name);
};
