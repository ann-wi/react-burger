import { DELETE_INGREDIENT } from "../../../utils/constants";

export function deleteIngredient(ingredient) {
  return {
    type: DELETE_INGREDIENT,
    payload: { ingredient },
  };
}
