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
import { TIngredient } from "../../utils/types";
import { TConstructorActions } from "../actions/constructorActions";

type TConstructorState = {
  ingredients: Array<TIngredient> | [];
  addedIngredients: Array<TIngredient>;
  currentIngredient: TIngredient | null;
  modalVisible: boolean;
  isLoading: boolean;
  orderSum: number;
  orderNumber: number;
  sendRequestOrder: boolean;
  respondErrorOrder: boolean;
  sendRequestIngredients: boolean;
  respondErrorIngredients: boolean;
};

const initialState: TConstructorState = {
  ingredients: [],
  addedIngredients: [],
  currentIngredient: null,
  modalVisible: false,
  isLoading: false,
  orderSum: 0,
  orderNumber: 0,
  sendRequestOrder: false,
  respondErrorOrder: false,
  sendRequestIngredients: false,
  respondErrorIngredients: false,
};

export const constructorReducer = (
  state = initialState,
  action: TConstructorActions
): TConstructorState => {
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
          action.ingredient,
        ],
      };
    case SUM_ORDER:
      return {
        ...state,
        orderSum: action.total,
      };
    case DELETE_INGREDIENT:
      return {
        ...state,
        addedIngredients: state.addedIngredients.filter(
          (item) => item !== action.ingredient
        ),
      };
    case SET_INGREDIENTS:
      return {
        ...state,
        addedIngredients: action.sortedIngrs,
      };
    case INCREASE_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients].map((item) =>
          item._id === action.id && item.type !== "bun"
            ? { ...item, counter: ++item.counter }
            : item._id === action.id && item.type === "bun"
            ? { ...item, counter: (item.counter = 2) }
            : item
        ),
      };
    case DECREASE_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients].map((item) =>
          item._id === action.id && item.type !== "bun"
            ? { ...item, counter: --item.counter }
            : item._id === action.id && item.type === "bun"
            ? { ...item, counter: (item.counter = 0) }
            : item
        ),
      };
    case GET_INGREDIENT_DETAILS:
      return {
        ...state,
        currentIngredient: action.ingredient,
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
        ingredients: action.ingredients,
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
        isLoading: true,
      };
    case RESPOND_SUCCESS_ORDER:
      return {
        ...state,
        orderNumber: action.number,
        sendRequestOrder: false,
        respondErrorOrder: false,
        modalVisible: true,
        isLoading: false,
      };
    case RESPOND_ERROR_ORDER:
      return {
        ...state,
        sendRequestOrder: false,
        respondErrorOrder: true,
        isLoading: false,
      };
    default:
      return state;
  }
};
