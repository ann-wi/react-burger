export const apiBurger = "https://norma.nomoreparties.space/api/";

export function makeRequest(request) {
  return {
    type: "_REQUEST",
    payload: { request },
  };
}

export function getError(error) {
  return {
    type: "_ERROR",
    payload: { error },
  };
}

export function getSuccess(success) {
  return {
    type: "_SUCCESS",
    payload: { success },
  };
}

export function getIngredients() {
  return (dispatch) => {
    fetch(`${apiBurger}ingredients`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(getSuccess(data));
      })
      .catch((err) => {
        dispatch(getError(err));
      });
  };
}

export function getOrder(ids) {
  return (dispatch) => {
    fetch(`${apiBurger}orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ids,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(getSuccess(data));
      })
      .catch((err) => {
        dispatch(getError(err));
      });
  };
}
