import { getIngredientsList } from "../actions/burgerIngredients";
import { getIngredientDetails } from "../actions/ingredietDetails";

const initialState = {
  ingredients: [],
  currentConstructor: [],
  currentIngredient: {},
  orderNumber: 0,
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
    default:
      return state;
  }
};
