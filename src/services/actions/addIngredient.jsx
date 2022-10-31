export function addIngredient(ingredientId) {
  return {
    type: "ADD_INGREDIENT",
    payload: { ingredientId },
  };
}
