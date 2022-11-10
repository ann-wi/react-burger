import { useDrag } from "react-dnd";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient-styles.module.css";

import PropTypes from "prop-types";
import uuid from "react-uuid";

const Ingredient = ({ ingredient, onClickPopup, ingrType }) => {
  const { _id, name, price, image, type } = ingredient;

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

  return ingrType === "ingredient" ? (
    <div className={ingredientStyles.card} ref={ingrDragRef} draggable>
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
