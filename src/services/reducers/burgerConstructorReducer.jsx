import { getIngredientsList } from "../actions/burgerIngredients";
import { getIngredientDetails } from "../actions/ingredietDetails";

const initialState = {
  ingredients: [],
  currentConstructor: [],
  currentIngredient: {},
  orderNumber: 0,
  sendRequest: false,
  respondError: false,
};

export const reactBurgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_INGREDIENTS_LIST":
      //console.log(action);
      return {
        ...state,
        ingredients: action.payload.ingredients,
      };
    case "GET_INGREDIENT_DETAILS":
      return {
        ...state,
        currentIngredient: action.payload.ingredient,
      };
    case "GET_ORDER_NUMBER":
      return {
        ...state,
        orderNumber: action.payload.number,
      };
    case "SEND_REQUEST":
      return {
        ...state,
        sendRequest: true,
      };
    case "RESPOND_SUCCESS":
      return {
        ...state,
        sendRequest: false,
        respondError: false,
        ingredients: action.payload.ingredients,
      };
    case "RESPOND_ERROR":
      return {
        ...state,
        sendRequest: false,
        respondError: true,
      };
    default:
      return state;
  }
};
