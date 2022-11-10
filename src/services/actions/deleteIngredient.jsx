import { DELETE_INGREDIENT } from "./constants";

export function deleteIngredient(ingredient) {
  return {
    type: DELETE_INGREDIENT,
    payload: { ingredient },
  };
}
