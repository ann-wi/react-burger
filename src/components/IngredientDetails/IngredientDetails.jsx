import { useDispatch, useSelector } from "react-redux";
import IngredientDetailsStyles from "./ingredients-details-styles.module.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getIngredientDetails } from "../../services/actions/constructor/ingredientDetails";

export const IngredientDetails = () => {
  const { id } = useParams();

  const ingr = useSelector((state) => {
    let ingr = state.constructorReducer.ingredients?.find(
      (elem) => elem._id === id
    );
    if (ingr) {
      return ingr;
    }
    return null;
  });

  if (!ingr) return null;

  return (
    <div className={IngredientDetailsStyles.container}>
      <h2
        className={`${IngredientDetailsStyles.title} mt-10 ml-10 text text_type_main-large`}
      >
        Детали ингредиента
      </h2>
      <img
        className={`${IngredientDetailsStyles.image} mb-4`}
        src={ingr.image}
        alt={ingr.name}
      ></img>
      <h2
        className={`${IngredientDetailsStyles.name} text text_type_main-medium`}
      >
        {ingr.name}
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
            {ingr.calories}
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
            {ingr.proteins}
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
            {ingr.fat}
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
            {ingr.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  );
};
