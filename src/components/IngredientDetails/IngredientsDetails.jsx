import PropTypes from "prop-types";
import IngredientDetailsStyles from "./ingredients-details-styles.module.css";

const IngredientDetails = ({ ingredient }) => {
  return (
    <>
      <div className={IngredientDetailsStyles.container}>
        <h2 className={`${IngredientDetailsStyles.title} mt-10 ml-10 text text_type_main-large`}>Детали ингредиента</h2>
        <img className={`${IngredientDetailsStyles.image} mb-4`} src={ingredient.image} alt={ingredient.name}></img>
        <h2 className={`${IngredientDetailsStyles.name} text text_type_main-medium`}>{ingredient.name}</h2>
        <ul className={`${IngredientDetailsStyles.list} mt-8 mb-15`}>
          <li className={`${IngredientDetailsStyles.listItem} mr-5`}>
            <h3 className={`${IngredientDetailsStyles.detail} text text_type_main-default`}>Калории,ккал</h3>
            <span className={`${IngredientDetailsStyles.number} mt-2 text text_type_digits-medium`}>{ingredient.calories}</span>
          </li>
          <li className={`${IngredientDetailsStyles.listItem} mr-5`}>
            <h3 className={`${IngredientDetailsStyles.detail} text text_type_main-default`}>Белки, г </h3>
            <span className={`${IngredientDetailsStyles.number} mt-2 text text_type_digits-medium`}>{ingredient.proteins}</span>
          </li>
          <li className={`${IngredientDetailsStyles.listItem} mr-5`}>
            <h3 className={`${IngredientDetailsStyles.detail} text text_type_main-default`}>Жиры, г</h3>
            <span className={`${IngredientDetailsStyles.number} mt-2 text text_type_digits-medium`}>{ingredient.fat}</span>
          </li>
          <li className={IngredientDetailsStyles.listItem}>
            <h3 className={`${IngredientDetailsStyles.detail} text text_type_main-default`}>Углеводы, г</h3>
            <span className={`${IngredientDetailsStyles.number} mt-2 text text_type_digits-medium`}>{ingredient.carbohydrates}</span>
          </li>
        </ul>
      </div>
    </>
  );
};

IngredientDetails.propTypes = {
  ingredient: PropTypes.object.isRequired,
};

export default IngredientDetails;
