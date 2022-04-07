import PropTypes from "prop-types";

const IngredientDetails = ({ ingredient }) => {
  return (
    <>
      <div>
        <h2>Детали ингредиента</h2>
        <img src={ingredient.image} alt={ingredient.name}></img>
        <div>
          <div>
            <p>Калории,ккал {ingredient.calories}</p>
            <p>Белки, г {ingredient.proteins}</p>
            <p>Жиры, г {ingredient.fat}</p>
            <p>Углеводы, г {ingredient.carbohydrates}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default IngredientDetails;
