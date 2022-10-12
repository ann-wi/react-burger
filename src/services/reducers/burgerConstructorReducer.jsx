const initialState = {
  ingredientsRequest: false,
  requestFailed: false,
  ingredients: [],
  currentConstructor: [],
  currentIngredient: {},
  orderNumber: 0,
};

export const reactBurgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_INGREDIENTS_LIST":
      console.log(action);
      return {
        ...state,
        ingredients: action.payload.ingredients,
      };
    case "GET_INGREDIENT_DETAILS":
      return {
        ...state,
        currentIngredient: action.payload.ingredient,
      };
    case "GET_ORDER_NUMBER":
      return {
        ...state,
        orderNumber: action.payload.number,
      };
    case "_REQUEST":
      return {
        ...state,
        ingredientsRequest: true,
        requestFailed: false,
      };
    case "_SUCCESS":
      return {
        ...state,
        ingredientsRequest: false,
        ingredients: action.payload.ingredients,
      };
    case "_ERROR":
      return {
        ...state,
        requestFailed: true,
        ingredientsRequest: false,
      };
    default:
      return state;
  }
};

// reconsider {}
// payload ???
