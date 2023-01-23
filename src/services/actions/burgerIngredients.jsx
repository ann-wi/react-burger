import { GET_INGREDIENTS_LIST } from "./constants";

export function getIngredientsList(ingredients) {
  return {
    type: GET_INGREDIENTS_LIST,
    payload: { ingredients },
  };
}
