import { ADD_INGREDIENT } from "../../utils/constants";

export function addIngredient(ingredient, id) {
  return {
    type: ADD_INGREDIENT,
    payload: { ingredient, id },
  };
}
