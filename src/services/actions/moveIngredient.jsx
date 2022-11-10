import { MOVE_INGREDIENT } from "./constants";

export function moveIngredient(reorderedIngredients) {
  return {
    type: MOVE_INGREDIENT,
    payload: { reorderedIngredients },
  };
}
