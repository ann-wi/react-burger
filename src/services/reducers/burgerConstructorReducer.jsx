import { ADD_INGREDIENT } from "../actions/constants";
import { DELETE_INGREDIENT } from "../actions/constants";
import { GET_INGREDIENT_DETAILS } from "../actions/constants";
import { SET_INGREDIENTS } from "../actions/constants";
import { SUM_ORDER } from "../actions/constants";
import { INCREASE_INGREDIENT } from "../actions/constants";
import { DECREASE_INGREDIENT } from "../actions/constants";
import { SEND_REQUEST_INGREDIENTS } from "../actions/constants";
import { RESPOND_SUCCESS_INGREDIENTS } from "../actions/constants";
import { RESPOND_ERROR_INGREDIENTS } from "../actions/constants";
import { SEND_REQUEST_ORDER } from "../actions/constants";
import { RESPOND_SUCCESS_ORDER } from "../actions/constants";
import { RESPOND_ERROR_ORDER } from "../actions/constants";

import { REGISTER_USER } from "../actions/constants";
import { SEND_REQUEST_REGISTER } from "../actions/constants";
import { RESPOND_SUCCESS_REGISTER } from "../actions/constants";
import { RESPOND_ERROR_REGISTER } from "../actions/constants";

import { LOGIN_USER } from "../actions/constants";
import { SEND_REQUEST_LOGIN } from "../actions/constants";
import { RESPOND_SUCCESS_LOGIN } from "../actions/constants";
import { RESPOND_ERROR_LOGIN } from "../actions/constants";

const initialState = {
  regFormInfo: {
    email: "",
    password: "",
    name: "",
  },
  ingredients: [],
  addedIngredients: [],
  currentIngredient: {},
  orderSum: 0,
  orderNumber: 0,
  sendRequestOrder: false,
  respondErrorOrder: false,
  sendRequestIngredients: false,
  respondErrorIngredients: false,
  sendRequestRegister: false,
  respondErrorRegister: false,
  sendRequestLogin: false,
  respondErrorLogin: false,
};

export const reactBurgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        regFormInfo: {
          ...state.regFormInfo,
          [action.payload.field]: action.payload.value,
        },
      };
    case LOGIN_USER:
      return {
        ...state,
        regFormInfo: {
          ...state.regFormInfo,
          [action.payload.field]: action.payload.value,
        },
      };
    case ADD_INGREDIENT:
      return {
        ...state,
        addedIngredients: [
          ...state.addedIngredients.filter((item, index, items) => {
            return item.type === "bun"
              ? !items.some((i, idx) => i.type === item.type && idx > index)
              : item.price * 2;
          }),
          action.payload.ingredient,
        ],
      };
    case SUM_ORDER:
      return {
        ...state,
        orderSum: action.payload.total,
      };
    case DELETE_INGREDIENT:
      return {
        ...state,
        addedIngredients: state.addedIngredients.filter(
          (item) => item !== action.payload.ingredient
        ),
      };
    case SET_INGREDIENTS:
      return {
        ...state,
        addedIngredients: action.payload.sortedIngrs,
      };
    case INCREASE_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients].map((item) =>
          item._id === action.payload.id && item.type !== "bun"
            ? { ...item, counter: ++item.counter }
            : item._id === action.payload.id && item.type === "bun"
            ? { ...item, counter: (item.counter = 2) }
            : item
        ),
      };
    case DECREASE_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients].map((item) =>
          item._id === action.payload.id && item.type !== "bun"
            ? { ...item, counter: --item.counter }
            : item._id === action.payload.id && item.type === "bun"
            ? { ...item, counter: (item.counter = 0) }
            : item
        ),
      };
    case GET_INGREDIENT_DETAILS:
      return {
        ...state,
        currentIngredient: action.payload.ingredient,
      };
    case SEND_REQUEST_INGREDIENTS:
      return {
        ...state,
        sendRequestIngredients: true,
      };
    case RESPOND_SUCCESS_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload.ingredients,
        sendRequestIngredients: false,
        respondErrorIngredients: false,
      };
    case RESPOND_ERROR_INGREDIENTS:
      return {
        ...state,
        sendRequestIngredients: false,
        respondErrorIngredients: true,
      };
    case SEND_REQUEST_ORDER:
      return {
        ...state,
        sendRequestOrder: true,
      };
    case RESPOND_SUCCESS_ORDER:
      return {
        ...state,
        orderNumber: action.payload.number,
        sendRequestOrder: false,
        respondErrorOrder: false,
      };
    case RESPOND_ERROR_ORDER:
      return {
        ...state,
        sendRequestOrder: false,
        respondErrorOrder: true,
      };
    case SEND_REQUEST_REGISTER:
      return {
        ...state,
        sendRequestRegister: true,
      };
    case RESPOND_SUCCESS_REGISTER:
      return {
        ...state,
        regFormInfo: action.payload.newUser,
        sendRequestRegister: false,
        respondErrorRegister: false,
      };
    case RESPOND_ERROR_REGISTER:
      return {
        ...state,
        sendRequestRegister: false,
        respondErrorRegister: true,
      };
    case SEND_REQUEST_LOGIN:
      return {
        ...state,
        sendRequestLogin: true,
      };
    case RESPOND_SUCCESS_LOGIN:
      return {
        ...state,
        regFormInfo: action.payload.user,
        sendRequestLogin: false,
        respondErrorLogin: false,
      };
    case RESPOND_ERROR_LOGIN:
      return {
        ...state,
        sendRequestLogin: false,
        respondErrorLogin: true,
      };
    default:
      return state;
  }
};
