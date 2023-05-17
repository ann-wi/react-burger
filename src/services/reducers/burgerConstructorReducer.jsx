import { ADD_INGREDIENT } from "../../utils/constants";
import { DELETE_INGREDIENT } from "../../utils/constants";
import { GET_INGREDIENT_DETAILS } from "../../utils/constants";
import { SET_INGREDIENTS } from "../../utils/constants";
import { SUM_ORDER } from "../../utils/constants";
import { INCREASE_INGREDIENT } from "../../utils/constants";
import { DECREASE_INGREDIENT } from "../../utils/constants";
import { SEND_REQUEST_INGREDIENTS } from "../../utils/constants";
import { RESPOND_SUCCESS_INGREDIENTS } from "../../utils/constants";
import { RESPOND_ERROR_INGREDIENTS } from "../../utils/constants";
import { SEND_REQUEST_ORDER } from "../../utils/constants";
import { RESPOND_SUCCESS_ORDER } from "../../utils/constants";
import { RESPOND_ERROR_ORDER } from "../../utils/constants";

import { REGISTER_USER } from "../../utils/constants";
import { SEND_REQUEST_REGISTER } from "../../utils/constants";
import { RESPOND_SUCCESS_REGISTER } from "../../utils/constants";
import { RESPOND_ERROR_REGISTER } from "../../utils/constants";

import { LOGIN_USER } from "../../utils/constants";
import { SEND_REQUEST_LOGIN } from "../../utils/constants";
import { RESPOND_SUCCESS_LOGIN } from "../../utils/constants";
import { RESPOND_ERROR_LOGIN } from "../../utils/constants";

import { SEND_REQUEST_USER } from "../../utils/constants";
import { RESPOND_SUCCESS_USER } from "../../utils/constants";
import { RESPOND_ERROR_USER } from "../../utils/constants";

import { CHANGE_USER } from "../../utils/constants";
import { SEND_REQUEST_CHANGE_USER } from "../../utils/constants";
import { RESPOND_SUCCESS_CHANGE_USER } from "../../utils/constants";
import { RESPOND_ERROR_CHANGE_USER } from "../../utils/constants";

import { FORGOT_PASSWORD } from "../../utils/constants";
import { SEND_REQUEST_FORGOT_PASSWORD } from "../../utils/constants";
import { RESPOND_SUCCESS_FORGOT_PASSWORD } from "../../utils/constants";
import { RESPOND_ERROR_FORGOT_PASSWORD } from "../../utils/constants";

const initialState = {
  user: {
    email: "",
    password: "",
    name: "",
  },
  accessToken: "",
  refreshToken: "",
  userIsAuthorized: false,
  forgotPasswordEmail: {
    email: "",
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
  sendRequestUser: false,
  respondErrorUser: false,
  sendRequestForgotPass: false,
  respondErrorForgotPass: false,
};

export const reactBurgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        user: {
          ...state.user,
          [action.payload.field]: action.payload.value,
        },
      };
    case LOGIN_USER:
      return {
        ...state,
        user: {
          ...state.user,
          [action.payload.field]: action.payload.value,
        },
      };
    case CHANGE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          [action.payload.field]: action.payload.value,
        },
      };
    case FORGOT_PASSWORD:
      return {
        ...state,
        forgotPasswordEmail: {
          ...state.forgotPasswordEmail,
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
        user: action.payload.newUser,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
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
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        sendRequestLogin: false,
        respondErrorLogin: false,
      };
    case RESPOND_ERROR_LOGIN:
      return {
        ...state,
        sendRequestLogin: false,
        respondErrorLogin: true,
      };
    case SEND_REQUEST_USER:
      return {
        ...state,
        sendRequestUser: true,
      };
    case RESPOND_SUCCESS_USER:
      return {
        ...state,
        user: action.payload.user,
        userIsAuthorized: true,
        sendRequestUser: false,
        respondErrorUser: false,
      };
    case RESPOND_ERROR_USER:
      return {
        ...state,
        sendRequestLogin: false,
        respondErrorLogin: true,
      };
    case SEND_REQUEST_CHANGE_USER:
      return {
        ...state,
        sendRequestChangeUser: true,
      };
    case RESPOND_SUCCESS_CHANGE_USER:
      return {
        ...state,
        user: action.payload.user,
        sendRequestChangeUser: false,
        respondErrorChangeUser: false,
      };
    case RESPOND_ERROR_CHANGE_USER:
      return {
        ...state,
        sendRequestChangeUser: false,
        respondErrorChangeUser: true,
      };

    case SEND_REQUEST_FORGOT_PASSWORD:
      return {
        ...state,
        sendRequestForgotPass: true,
      };
    case RESPOND_SUCCESS_FORGOT_PASSWORD:
      return {
        ...state,
        forgotPasswordEmail: action.payload.email,
        sendRequestForgotPass: false,
        respondErrorForgotPass: false,
      };
    case RESPOND_ERROR_FORGOT_PASSWORD:
      return {
        ...state,
        sendRequestForgotPass: false,
        respondErrorForgotPass: true,
      };
    default:
      return state;
  }
};
