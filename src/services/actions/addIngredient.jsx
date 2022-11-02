export function addIngredient(_id) {
  return {
    type: "ADD_INGREDIENT",
    payload: { _id },
  };
}
