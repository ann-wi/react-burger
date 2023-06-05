import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import IngredientDetailsStyles from "./ingredients-details-styles.module.css";
import { useParams } from "react-router-dom";
import { Component, useEffect } from "react";
import { getIngredientDetails } from "../../services/actions/constructor/ingredientDetails";

const IngredientDetails = () => {
  const ingredients = useSelector(
    (state) => state.constructorReducer.ingredients
  );
  const currentIngr = useSelector(
    (state) => state.constructorReducer.currentIngredient
  );
  const dispatch = useDispatch();
  const { id } = useParams();

  const findIngr = (id) => {
    const elem = ingredients.find((i) => i._id === id);
    return elem;
  };

  useEffect(() => {
    if (ingredients) {
      const theIngr = findIngr(id);
      dispatch(getIngredientDetails(theIngr));
    }
  }, [ingredients]);

  return (
    <div className={IngredientDetailsStyles.container}>
      <h2
        className={`${IngredientDetailsStyles.title} mt-10 ml-10 text text_type_main-large`}
      >
        Детали ингредиента
      </h2>
      <img
        className={`${IngredientDetailsStyles.image} mb-4`}
        src={currentIngr.image}
        alt={currentIngr.name}
      ></img>
      <h2
        className={`${IngredientDetailsStyles.name} text text_type_main-medium`}
      >
        {currentIngr.name}
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
            {currentIngr.calories}
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
            {currentIngr.proteins}
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
            {currentIngr.fat}
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
            {currentIngr.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;

/*
const ingredients = useSelector(
    (state) => state.constructorReducer.ingredients
  );
  const currentIngr = useSelector(
    (state) => state.constructorReducer.currentIngredient
  );
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const findItem = ingredients.find((i) => i._id === id);
    dispatch(getIngredientDetails(findItem));
    console.log(findItem);
  }, [dispatch, id, ingredients]);

  const theIngr = !ingredient ? currentIngr : ingredient;
*/
