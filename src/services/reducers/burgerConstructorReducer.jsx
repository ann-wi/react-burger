import { ADD_INGREDIENT } from "../actions/constants";
import { DELETE_INGREDIENT } from "../actions/constants";
import { GET_INGREDIENT_DETAILS } from "../actions/constants";
import { MOVE_INGREDIENT } from "../actions/constants";
import { GET_COUNTER_NUMBER } from "../actions/constants";
import { SEND_REQUEST_INGREDIENTS } from "../actions/constants";
import { RESPOND_SUCCESS_INGREDIENTS } from "../actions/constants";
import { RESPOND_ERROR_INGREDIENTS } from "../actions/constants";
import { SEND_REQUEST_ORDER } from "../actions/constants";
import { RESPOND_SUCCESS_ORDER } from "../actions/constants";
import { RESPOND_ERROR_ORDER } from "../actions/constants";

const initialState = {
  ingredients: [],
  addedIngredients: [],
  currentConstructor: [],
  currentIngredient: {},
  orderNumber: 0,
  counterNum: 0,
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
    case MOVE_INGREDIENT:
      return {
        ...state,
        addedIngredients: action.payload.reorderedIngredients,
      };
    case GET_COUNTER_NUMBER:
      return {
        ...state,
        counterNum: action.payload.number,
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
