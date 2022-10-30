const initialState = {
  ingredients: [],
  addedIngredients: [],
  currentConstructor: [],
  currentIngredient: {},
  orderNumber: 0,
  sendRequestOrder: false,
  respondErrorOrder: false,
  sendRequestIngredients: false,
  respondErrorIngredients: false,
};

export const reactBurgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_INGREDIENT":
      return {
        ...state,
        addedIngredients: action.payload.ingredient,
      };
    case "GET_INGREDIENT_DETAILS":
      return {
        ...state,
        currentIngredient: action.payload.ingredient,
      };
    case "SEND_REQUEST_INGREDIENTS":
      return {
        ...state,
        sendRequestIngredients: true,
      };
    case "RESPOND_SUCCESS_INGREDIENTS":
      return {
        ...state,
        ingredients: action.payload.ingredients,
        sendRequestIngredients: false,
        respondErrorIngredients: false,
      };
    case "RESPOND_ERROR_INGREDIENTS":
      return {
        ...state,
        sendRequestIngredients: false,
        respondErrorIngredients: true,
      };
    case "SEND_REQUEST_ORDER":
      return {
        ...state,
        sendRequestOrder: true,
      };
    case "RESPOND_SUCCESS_ORDER":
      return {
        ...state,
        orderNumber: action.payload.number,
        sendRequestOrder: false,
        respondErrorOrder: false,
      };
    case "RESPOND_ERROR_ORDER":
      return {
        ...state,
        sendRequestOrder: false,
        respondErrorOrder: true,
      };
    default:
      return state;
  }
};
