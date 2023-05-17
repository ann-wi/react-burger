import { DECREASE_INGREDIENT } from "../../utils/constants";

export function decreaseIngredient(id) {
  return {
    type: DECREASE_INGREDIENT,
    payload: { id },
  };
}
