import { Dispatch } from "react";
import {
  ADD_INGREDIENT,
  DECREASE_INGREDIENT,
  DELETE_INGREDIENT,
  GET_INGREDIENTS_LIST,
  GET_INGREDIENT_DETAILS,
  INCREASE_INGREDIENT,
  RESPOND_ERROR_INGREDIENTS,
  RESPOND_ERROR_ORDER,
  RESPOND_SUCCESS_INGREDIENTS,
  RESPOND_SUCCESS_ORDER,
  SEND_REQUEST_INGREDIENTS,
  SEND_REQUEST_ORDER,
  SET_INGREDIENTS,
  SUM_ORDER,
} from "../../utils/constants";
import { apiGetIngredients, apiSendOrder } from "../../utils/server";
import { AppDispatch } from "../../utils/storeTypes";
import { TIngredient } from "../../utils/types";

export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  readonly ingredient: TIngredient;
  readonly id: string;
}

export interface IDeleteIngredient {
  readonly type: typeof DELETE_INGREDIENT;
  readonly ingredient: TIngredient;
}

export interface ISetIngredients {
  readonly type: typeof SET_INGREDIENTS;
  readonly sortedIngrs: TIngredient[];
}

export interface IIncreaseIngredient {
  readonly type: typeof INCREASE_INGREDIENT;
  readonly id: string;
}

export interface IDecreaseIngredient {
  readonly type: typeof DECREASE_INGREDIENT;
  readonly id: string;
}

export interface ISumOrder {
  readonly type: typeof SUM_ORDER;
  readonly total: number;
}

export interface IGetIngredientDetails {
  readonly type: typeof GET_INGREDIENT_DETAILS;
  readonly ingredient: TIngredient;
}

export interface ISendRequestIngredients {
  readonly type: typeof SEND_REQUEST_INGREDIENTS;
  readonly sendRequest: boolean;
}

export interface IRespondSuccessIngredients {
  readonly type: typeof RESPOND_SUCCESS_INGREDIENTS;
  readonly ingredients: TIngredient[];
}

export interface IRespondErrorIngredients {
  readonly type: typeof RESPOND_ERROR_INGREDIENTS;
  readonly respondError: boolean;
}

export interface ISendRequestOrder {
  readonly type: typeof SEND_REQUEST_ORDER;
  readonly sendRequest: boolean;
}

export interface IRespondSuccessOrder {
  readonly type: typeof RESPOND_SUCCESS_ORDER;
  readonly number: number;
}

export interface IRespondErrorOrder {
  readonly type: typeof RESPOND_ERROR_ORDER;
  readonly respondError: boolean;
}

export type TConstructorActions =
  | IAddIngredient
  | IDeleteIngredient
  | ISetIngredients
  | IIncreaseIngredient
  | IDecreaseIngredient
  | ISumOrder
  | IGetIngredientDetails
  | ISendRequestIngredients
  | IRespondSuccessIngredients
  | IRespondErrorIngredients
  | ISendRequestOrder
  | IRespondSuccessOrder
  | IRespondErrorOrder;

export function addIngredient(
  ingredient: TIngredient,
  id: string
): IAddIngredient {
  return {
    type: ADD_INGREDIENT,
    ingredient,
    id,
  };
}

export function deleteIngredient(ingredient: TIngredient): IDeleteIngredient {
  return {
    type: DELETE_INGREDIENT,
    ingredient,
  };
}

export function setNewIngrs(sortedIngrs: TIngredient[]): ISetIngredients {
  return {
    type: SET_INGREDIENTS,
    sortedIngrs,
  };
}

export function increaseIngredient(id: string): IIncreaseIngredient {
  return {
    type: INCREASE_INGREDIENT,
    id,
  };
}

export function decreaseIngredient(id: string): IDecreaseIngredient {
  return {
    type: DECREASE_INGREDIENT,
    id,
  };
}

export function sumOrder(total: number): ISumOrder {
  return {
    type: SUM_ORDER,
    total,
  };
}

export function getIngredientDetails(
  ingredient: TIngredient
): IGetIngredientDetails {
  return {
    type: GET_INGREDIENT_DETAILS,
    ingredient,
  };
}

export function sendRequestIngredients(
  sendRequest: boolean
): ISendRequestIngredients {
  return {
    type: SEND_REQUEST_INGREDIENTS,
    sendRequest,
  };
}

export function respondSuccessIngredients(
  ingredients: TIngredient[]
): IRespondSuccessIngredients {
  return {
    type: RESPOND_SUCCESS_INGREDIENTS,
    ingredients,
  };
}

export function respondErrorIngredients(
  respondError: boolean
): IRespondErrorIngredients {
  return {
    type: RESPOND_ERROR_INGREDIENTS,
    respondError,
  };
}

export function sendRequestOrder(sendRequest: boolean): ISendRequestOrder {
  return {
    type: SEND_REQUEST_ORDER,
    sendRequest,
  };
}

export function respondSuccessOrder(number: number): IRespondSuccessOrder {
  return {
    type: RESPOND_SUCCESS_ORDER,
    number,
  };
}

export function respondErrorOrder(respondError: boolean): IRespondErrorOrder {
  return {
    type: RESPOND_ERROR_ORDER,
    respondError,
  };
}

export function getIngredients() {
  return function (dispatch: AppDispatch) {
    dispatch(sendRequestIngredients(true));

    apiGetIngredients()
      .then((data) => {
        data.data.forEach((item: TIngredient) => {
          item.counter = 0;
        });
        dispatch(respondSuccessIngredients(data.data));
      })
      .catch((err) => {
        dispatch(respondErrorIngredients(true));
      });
  };
}

export function getOrderNumber(ingredientsIds: Array<string>) {
  return function (dispatch: AppDispatch) {
    dispatch(sendRequestOrder(true));

    apiSendOrder(ingredientsIds)
      .then((data) => {
        dispatch(respondSuccessOrder(data.order.number));
      })
      .catch((err) => {
        dispatch(respondErrorOrder(true));
      });
  };
}
