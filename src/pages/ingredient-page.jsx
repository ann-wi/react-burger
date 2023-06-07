import IngredientDetails from "../components/IngredientDetails/IngredientDetails";
import IngredientPageStyles from "./ingredient-page-styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getIngredientDetails } from "../services/actions/constructor/ingredientDetails";
import { getIngredients } from "../services/actions/constructor/server-actions-constructor";

export const IngredientPage = () => {
  const ingredients = useSelector(
    (state) => state.constructorReducer.ingredients
  );
  const currentIngr = useSelector(
    (state) => state.constructorReducer.currentIngredient
  );

  const dispatch = useDispatch();
  const { id } = useParams();

  function findIngr(id) {
    const elem = ingredients.find((i) => i._id === id);
    return elem;
  }

  const searchElement = findIngr(id);

  findIngr(id);
  console.log(searchElement);

  return (
    <div className={IngredientPageStyles.container}>
      <h2
        className={`${IngredientPageStyles.title} mt-10 ml-10 text text_type_main-large`}
      >
        Детали ингредиента
      </h2>
      <img
        className={`${IngredientPageStyles.image} mb-4`}
        src={currentIngr.image}
        alt={currentIngr.name}
      ></img>
      <h2 className={`${IngredientPageStyles.name} text text_type_main-medium`}>
        {currentIngr.name}
      </h2>
      <ul className={`${IngredientPageStyles.list} mt-8 mb-15`}>
        <li className={`${IngredientPageStyles.listItem} mr-5`}>
          <h3
            className={`${IngredientPageStyles.detail} text text_type_main-default`}
          >
            Калории,ккал
          </h3>
          <span
            className={`${IngredientPageStyles.number} mt-2 text text_type_digits-medium`}
          >
            {currentIngr.calories}
          </span>
        </li>
        <li className={`${IngredientPageStyles.listItem} mr-5`}>
          <h3
            className={`${IngredientPageStyles.detail} text text_type_main-default`}
          >
            Белки, г{" "}
          </h3>
          <span
            className={`${IngredientPageStyles.number} mt-2 text text_type_digits-medium`}
          >
            {currentIngr.proteins}
          </span>
        </li>
        <li className={`${IngredientPageStyles.listItem} mr-5`}>
          <h3
            className={`${IngredientPageStyles.detail} text text_type_main-default`}
          >
            Жиры, г
          </h3>
          <span
            className={`${IngredientPageStyles.number} mt-2 text text_type_digits-medium`}
          >
            {currentIngr.fat}
          </span>
        </li>
        <li className={IngredientPageStyles.listItem}>
          <h3
            className={`${IngredientPageStyles.detail} text text_type_main-default`}
          >
            Углеводы, г
          </h3>
          <span
            className={`${IngredientPageStyles.number} mt-2 text text_type_digits-medium`}
          >
            {currentIngr.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  );
};

/*
const ingredients = useSelector(
    (state) => state.constructorReducer.ingredients
  );
  const currentIngr = useSelector(
    (state) => state.constructorReducer.currentIngredient
  );
  const dispatch = useDispatch();
  const { id } = useParams();

  const getTheIngr = (id) => {
    const elem = ingredients.find((i) => i._id === id);
    return elem;
  };

  useEffect(() => {
    if (ingredients) {
      const theIngr = getTheIngr(id);
      console.log(theIngr);
      dispatch(getIngredientDetails(theIngr));
      return theIngr;
    }
  }, [dispatch, id, ingredients]);

  const displIngr = getTheIngr(id);

*/
