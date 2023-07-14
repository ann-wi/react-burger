import { INCREASE_INGREDIENT } from "../../../utils/constants";

export function increaseIngredient(id) {
  return {
    type: INCREASE_INGREDIENT,
    payload: { id },
  };
}
