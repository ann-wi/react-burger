import { getIngredientsList } from "./burgerIngredients";

const apiBurger = "https://norma.nomoreparties.space/api/";

export function sendRequest(sendRequest) {
  return {
    type: "SEND_REQUEST",
    payload: { sendRequest },
  };
}

export function respondSuccess() {
  return {
    type: "RESPOND_SUCCESS",
  };
}

export function respondError(respondError) {
  return {
    type: "RESPOND_ERROR",
    payload: { respondError },
  };
}

export function getIngredinets() {
  return function (dispatch) {
    dispatch(sendRequest(true));

    fetch(`${apiBurger}ingredients`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res && res.ok) {
          dispatch(respondSuccess());
          dispatch(getIngredientsList(res.json()));
        } else {
          dispatch(respondError(true));
        }
      })
      .catch((err) => {
        dispatch(respondError(true));
      });
  };
}

// res.success -> res.ok
