import { useDrag } from "react-dnd";
import { useEffect, useMemo, useState } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient-styles.module.css";

import { getCounterNumber } from "../../services/actions/getCounterNumber";
import PropTypes from "prop-types";
import uuid from "react-uuid";
import { useSelector, useDispatch } from "react-redux";

const Ingredient = ({ ingredient, onClickPopup, ingrType }) => {
  const dispatch = useDispatch();

  const { _id, name, price, image, type } = ingredient;
  const counterNumber = useSelector(
    (state) => state.reactBurgerReducer.counterNum
  );
  const addedIngredients = useSelector(
    (state) => state.reactBurgerReducer.addedIngredients
  );

  //if (addedIngredients.find((item) => item.name === ingredient.name)) {
  //  return (counter += 1);
  //} else {
  //  console.log("ERROR");
  //}
  //console.log(counter);

  const [, ingrDragRef] = useDrag({
    type: "ingredient",
    item: {
      id: _id,
      name: name,
      price: price,
      image: image,
      type: type,
      uuid: uuid(),
    },
  });

  const [, bunDragRef] = useDrag({
    type: "burgerBun",
    item: {
      id: _id,
      name: name,
      price: price,
      image: image,
      type: type,
      uuid: uuid(),
    },
  });

  //display none

  const [counterN, setCounterN] = useState(0);

  const countItems = (ingr, items) => {
    let currNum = 0;

    const newArr = items
      .filter((item) => {
        if (item.id === ingr._id) {
          return item;
        }
      })
      .map(() => {
        if (addedIngredients.find((item) => item.id === ingredient._id)) {
          currNum += 1;
          return ingr;
        }
      });

    //currNum = newArr.length;

    //dispatch(getCounterNumber(currNum));
    setCounterN(currNum);

    console.log(ingr);
    console.log(newArr);
  };

  const memoCount = useMemo(() => {
    return countItems;
  }, [counterN]);

  const counterVisibility = addedIngredients.find(
    (item) => item.id === ingredient._id
  )
    ? "flex"
    : "none";

  //style={{ display: counterVisibility }}

  return ingrType === "ingredient" ? (
    <div
      className={ingredientStyles.card}
      ref={ingrDragRef}
      draggable
      name={ingredient.name}
      onDragEnd={(e) => {
        countItems(ingredient, addedIngredients);
        console.log(e.currentTarget);
      }}
    >
      <p
        className={ingredientStyles.addedIngrNum}
        style={{ display: counterVisibility }}
      >
        {counterNumber}
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
    <div className={ingredientStyles.card} ref={bunDragRef} draggable>
      <p className={ingredientStyles.addedIngrNum}>{counterNumber}</p>
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
