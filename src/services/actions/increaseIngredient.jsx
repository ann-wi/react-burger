import { INCREASE_INGREDIENT } from "./constants";

export function increaseIngredient(id) {
  return {
    type: INCREASE_INGREDIENT,
    payload: { id },
  };
}
