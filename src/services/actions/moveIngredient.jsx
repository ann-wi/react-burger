import { MOVE_INGREDIENT } from "./constants";

export function moveIngredient(selectedIngr) {
  return {
    type: MOVE_INGREDIENT,
    payload: { selectedIngr },
  };
}
