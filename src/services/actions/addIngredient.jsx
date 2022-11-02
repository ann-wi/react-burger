export function addIngredient(ingredient) {
  return {
    type: "ADD_INGREDIENT",
    payload: { ingredient },
  };
}
