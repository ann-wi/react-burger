import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  GET_INGREDIENT_DETAILS,
  SET_INGREDIENTS,
  SUM_ORDER,
  INCREASE_INGREDIENT,
  DECREASE_INGREDIENT,
  SEND_REQUEST_INGREDIENTS,
  RESPOND_SUCCESS_INGREDIENTS,
  RESPOND_ERROR_INGREDIENTS,
  SEND_REQUEST_ORDER,
  RESPOND_SUCCESS_ORDER,
  RESPOND_ERROR_ORDER,
} from "../../utils/constants";
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
