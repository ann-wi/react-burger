import { getIngredientsList } from "./burgerIngredients";
const apiBurger = "https://norma.nomoreparties.space/api/";

export function sendRequest(sendRequest) {
  return {
    type: "SEND_REQUEST",
    payload: { sendRequest },
  };
}

export function respondSuccess(ingredients) {
  return {
    type: "RESPOND_SUCCESS",
    payload: { ingredients },
  };
}

export function respondError(respondError) {
  return {
    type: "RESPOND_ERROR",
    payload: { respondError },
  };
}

export function getIngredients() {
  return function (dispatch) {
    dispatch(sendRequest(true));

    fetch(`${apiBurger}ingredients`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(respondSuccess(data.data));
      })
      .catch((err) => {
        dispatch(respondError(true));
      });
  };
}

export function getOrderNumber() {
  return function (dispatch) {
    dispatch(sendRequest(true));

    fetch(`${apiBurger}orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredientsIds,
      }),
    })
      .then(checkResponse)
      .then((data) => {
        setOrderDetalis(data.order.number);
      })
      .catch((err) => {
        dispatch(respondError(true));
      });
  };
}
