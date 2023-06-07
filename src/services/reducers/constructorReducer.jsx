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

const initialState = {
  ingredients: [],
  addedIngredients: [],
  currentIngredient: {},
  modalVisible: false,
  orderSum: 0,
  orderNumber: 0,
  sendRequestOrder: false,
  respondErrorOrder: false,
  sendRequestIngredients: false,
  respondErrorIngredients: false,
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
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
        modalVisible: true,
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
        modalVisible: true,
      };
    case RESPOND_ERROR_ORDER:
      return {
        ...state,
        sendRequestOrder: false,
        respondErrorOrder: true,
      };
    default:
      return state;
  }
};
