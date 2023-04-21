import { GET_INGREDIENT_DETAILS } from "./constants";

export function getIngredientDetails(ingredient) {
  return {
    type: GET_INGREDIENT_DETAILS,
    payload: { ingredient },
  };
}
