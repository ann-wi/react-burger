import { useSelector } from "react-redux";
import IngredientDetailsStyles from "./ingredients-details-styles.module.css";
import { useParams } from "react-router-dom";

export const IngredientDetails = () => {
  const ingredients = useSelector(
    (state) => state.constructorReducer.ingredients
  );
  const { id } = useParams();

  const findIngr = (id) => {
    const elem = ingredients.find((i) => i._id === id);
    return elem;
  };

  const theIngr = findIngr(id);

  if (!theIngr) return null;

  return (
    <div className={IngredientDetailsStyles.container}>
      <h2
        className={`${IngredientDetailsStyles.title} mt-10 ml-10 text text_type_main-large`}
      >
        Детали ингредиента
      </h2>
      <img
        className={`${IngredientDetailsStyles.image} mb-4`}
        src={theIngr.image}
        alt={theIngr.name}
      ></img>
      <h2
        className={`${IngredientDetailsStyles.name} text text_type_main-medium`}
      >
        {theIngr.name}
      </h2>
      <ul className={`${IngredientDetailsStyles.list} mt-8 mb-15`}>
        <li className={`${IngredientDetailsStyles.listItem} mr-5`}>
          <h3
            className={`${IngredientDetailsStyles.detail} text text_type_main-default`}
          >
            Калории,ккал
          </h3>
          <span
            className={`${IngredientDetailsStyles.number} mt-2 text text_type_digits-medium`}
          >
            {theIngr.calories}
          </span>
        </li>
        <li className={`${IngredientDetailsStyles.listItem} mr-5`}>
          <h3
            className={`${IngredientDetailsStyles.detail} text text_type_main-default`}
          >
            Белки, г{" "}
          </h3>
          <span
            className={`${IngredientDetailsStyles.number} mt-2 text text_type_digits-medium`}
          >
            {theIngr.proteins}
          </span>
        </li>
        <li className={`${IngredientDetailsStyles.listItem} mr-5`}>
          <h3
            className={`${IngredientDetailsStyles.detail} text text_type_main-default`}
          >
            Жиры, г
          </h3>
          <span
            className={`${IngredientDetailsStyles.number} mt-2 text text_type_digits-medium`}
          >
            {theIngr.fat}
          </span>
        </li>
        <li className={IngredientDetailsStyles.listItem}>
          <h3
            className={`${IngredientDetailsStyles.detail} text text_type_main-default`}
          >
            Углеводы, г
          </h3>
          <span
            className={`${IngredientDetailsStyles.number} mt-2 text text_type_digits-medium`}
          >
            {theIngr.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  );
};
