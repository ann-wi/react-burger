import { DECREASE_INGREDIENT } from "./constants";

export function decreaseIngredient(id) {
  return {
    type: DECREASE_INGREDIENT,
    payload: { id },
  };
}
