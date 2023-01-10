import { useDrag } from "react-dnd";
import { useEffect, useMemo, useState } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient-styles.module.css";

import { increaseIngredient } from "../../services/actions/increaseIngredient";
import { decreaseIngredient } from "../../services/actions/decreaseIngredient";
import PropTypes from "prop-types";
import uuid from "react-uuid";
import { useSelector, useDispatch } from "react-redux";

const Ingredient = ({ ingredient, onClickPopup, ingrType, id }) => {
  const dispatch = useDispatch();

  const { _id, name, price, image, type, counter, uuid } = ingredient;
  const addedIngredients = useSelector(
    (state) => state.reactBurgerReducer.addedIngredients
  );

  const [, ingrDragRef] = useDrag({
    type: "ingredient",
    item: {
      id: _id,
      name: name,
      counter: counter,
      price: price,
      image: image,
      type: type,
      uuid: uuid,
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
      uuid: uuid,
    },
  });

  const counterVisibilityBuns = addedIngredients.find(
    (item) =>
      item.type === "bun" &&
      item.id === ingredient._id &&
      ingredient.counter !== 0
  )
    ? "flex"
    : "none";

  const counterVisibility = addedIngredients.find(
    (item) => item.id === ingredient.id && ingredient.counter !== 0
  )
    ? "flex"
    : "none";

  return ingrType === "ingredient" ? (
    <div
      className={ingredientStyles.card}
      ref={ingrDragRef}
      draggable
      onDrag={() => console.log(ingredient)}
    >
      <p
        className={ingredientStyles.addedIngrNum}
        style={{ display: counterVisibility }}
      >
        {ingredient.counter}
      </p>
      <img
        onClick={() => onClickPopup(ingredient)}
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
    <div
      className={ingredientStyles.card}
      ref={bunDragRef}
      draggable
      onDragEnd={() => dispatch(decreaseIngredient(ingredient.id))}
    >
      <p
        className={ingredientStyles.addedIngrNum}
        style={{ display: counterVisibilityBuns }}
      >
        {ingredient.counter}
      </p>
      <img
        onClick={() => onClickPopup(ingredient)}
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
  onClickPopup: PropTypes.func,
};

export default Ingredient;
