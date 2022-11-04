export function moveIngredient(reorderedIngredients) {
  return {
    type: "MOVE_INGREDIENT",
    payload: { reorderedIngredients },
  };
}
