import { ADD_INGREDIENT } from "../actions/constants";
import { DELETE_INGREDIENT } from "../actions/constants";
import { GET_INGREDIENT_DETAILS } from "../actions/constants";
import { SET_INGREDIENTS } from "../actions/constants";
import { INCREASE_INGREDIENT } from "../actions/constants";
import { DECREASE_INGREDIENT } from "../actions/constants";
import { SEND_REQUEST_INGREDIENTS } from "../actions/constants";
import { RESPOND_SUCCESS_INGREDIENTS } from "../actions/constants";
import { RESPOND_ERROR_INGREDIENTS } from "../actions/constants";
import { SEND_REQUEST_ORDER } from "../actions/constants";
import { RESPOND_SUCCESS_ORDER } from "../actions/constants";
import { RESPOND_ERROR_ORDER } from "../actions/constants";

const initialState = {
  ingredients: [],
  addedIngredients: [],
  currentIngredient: {},
  orderNumber: 0,
  sendRequestOrder: false,
  respondErrorOrder: false,
  sendRequestIngredients: false,
  respondErrorIngredients: false,
};

export const reactBurgerReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};
