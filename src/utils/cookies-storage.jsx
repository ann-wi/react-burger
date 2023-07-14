// Cookies

export function setCookie(name, value, props) {
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

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const deleteCookie = (name) => {
  setCookie(name, null, { expires: -1, path: "/" });
};

// LocalStorage

export const saveToLocalStorage = (name, data) => {
  console.log(data);
  localStorage.setItem(name, data);
};

export const getFromLocalStorage = (name) => {
  const myData = localStorage.getItem(name);
  console.log(myData);
  return myData;
};

export const deleteFromLocalStorage = (name) => {
  localStorage.removeItem(name);
};
