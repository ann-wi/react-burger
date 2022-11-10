import { ADD_INGREDIENT } from "./constants";

export function addIngredient(ingredient, id) {
  return {
    type: ADD_INGREDIENT,
    payload: { ingredient, id },
  };
}
