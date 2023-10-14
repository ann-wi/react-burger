import { useDrag } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient-styles.module.css";

import PropTypes from "prop-types";
import uuid from "react-uuid";
import { useLocation, useNavigate } from "react-router-dom";
import { getIngredientDetails } from "../../services/actions/constructorActions";

export const Ingredient = ({ ingredient, ingrType }) => {
  const { _id, name, price, image, type, counter } = ingredient;
  ingredient.uuid = uuid();
  const addedIngredients = useSelector(
    (state) => state.constructorReducer.addedIngredients
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const clickHandler = () => {
    dispatch(getIngredientDetails(ingredient));
    console.log(ingredient);
    navigate(`/ingredients/${ingredient._id}`, {
      state: { background: location },
    });
  };

  const [, ingrDragRef] = useDrag({
    type: "ingredient",
    item: {
      id: _id,
      name: name,
      counter: counter,
      price: price,
      image: image,
      type: type,
      uuid: ingredient.uuid,
    },
  });

  const [, bunDragRef] = useDrag({
    type: "burgerBun",
    item: {
      id: _id,
      name: name,
      counter: counter,
      price: price,
      image: image,
      type: type,
      uuid: ingredient.uuid,
    },
  });

  const counterVisibilityBuns = addedIngredients.find(
    (item) =>
      item.type === "bun" &&
      item.id === ingredient._id &&
      ingredient.counter !== 0
  );

  const counterVisibilityMain = addedIngredients.find(
    (item) => item.id === ingredient.id && ingredient.counter !== 0
  );

  return ingrType === "ingredient" ? (
    <div className={ingredientStyles.card} ref={ingrDragRef} draggable>
      {counterVisibilityMain && (
        <Counter count={ingredient.counter} size="default" />
      )}
      <img
        onClick={clickHandler}
        src={ingredient.image}
        className={`${ingredientStyles.image} mr-4 ml-4`}
        alt={ingredient.name}
      />
      <div
        className={`${ingredientStyles.price} pt-1 pb-1 text text_type_digits-default`}
      >
        <p className={ingredientStyles.priceNum}>{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p
        className={`${ingredientStyles.name} mt-1 text text_type_main-default`}
      >
        {ingredient.name}
      </p>
    </div>
  ) : (
    <div className={ingredientStyles.card} ref={bunDragRef} draggable>
      {counterVisibilityBuns && (
        <Counter count={ingredient.counter} size="default" />
      )}
      <img
        onClick={clickHandler}
        src={ingredient.image}
        className={`${ingredientStyles.image} mr-4 ml-4`}
        alt={ingredient.name}
      />
      <div
        className={`${ingredientStyles.price} pt-1 pb-1 text text_type_digits-default`}
      >
        <p className={ingredientStyles.priceNum}>{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p
        className={`${ingredientStyles.name} mt-1 text text_type_main-default`}
      >
        {ingredient.name}
      </p>
    </div>
  );
};

Ingredient.propTypes = {
  ingredient: PropTypes.object,
  ingrType: PropTypes.string,
};
