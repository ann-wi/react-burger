import { useDrag } from "react-dnd";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient-styles.module.css";
import uuid from "react-uuid";
import { useLocation, useNavigate } from "react-router-dom";
import { getIngredientDetails } from "../../services/actions/constructorActions";
import { TIngredient } from "../../utils/types";
import { FC } from "react";
import { useDispatch, useSelector } from "../../utils/storeTypes";

export interface IIngredient {
  ingredient: TIngredient;
  ingrType: string;
}

export const Ingredient: FC<IIngredient> = (props) => {
  const { _id, name, price, image, type, counter } = props.ingredient;
  props.ingredient.uuid = uuid();
  const addedIngredients = useSelector(
    (state) => state.constructorReducer.addedIngredients
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const clickHandler = () => {
    dispatch(getIngredientDetails(props.ingredient));
    console.log(props.ingredient);
    navigate(`/ingredients/${props.ingredient._id}`, {
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
      uuid: props.ingredient.uuid,
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
      uuid: props.ingredient.uuid,
    },
  });

  const counterVisibilityBuns = addedIngredients.find(
    (item) =>
      item.type === "bun" &&
      item.id === props.ingredient._id &&
      props.ingredient.counter !== 0
  );

  const counterVisibilityMain = addedIngredients.find(
    (item) => item.id === props.ingredient.id && props.ingredient.counter !== 0
  );

  return props.ingrType === "ingredient" ? (
    <div className={ingredientStyles.card} ref={ingrDragRef} draggable>
      {counterVisibilityMain && (
        <Counter count={props.ingredient.counter} size="default" />
      )}
      <img
        onClick={clickHandler}
        src={props.ingredient.image}
        className={`${ingredientStyles.image} mr-4 ml-4`}
        alt={props.ingredient.name}
      />
      <div
        className={`${ingredientStyles.price} pt-1 pb-1 text text_type_digits-default`}
      >
        <p className={ingredientStyles.priceNum}>{props.ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p
        className={`${ingredientStyles.name} mt-1 text text_type_main-default`}
      >
        {props.ingredient.name}
      </p>
    </div>
  ) : (
    <div className={ingredientStyles.card} ref={bunDragRef} draggable>
      {counterVisibilityBuns && (
        <Counter count={props.ingredient.counter} size="default" />
      )}
      <img
        onClick={clickHandler}
        src={props.ingredient.image}
        className={`${ingredientStyles.image} mr-4 ml-4`}
        alt={props.ingredient.name}
      />
      <div
        className={`${ingredientStyles.price} pt-1 pb-1 text text_type_digits-default`}
      >
        <p className={ingredientStyles.priceNum}>{props.ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p
        className={`${ingredientStyles.name} mt-1 text text_type_main-default`}
      >
        {props.ingredient.name}
      </p>
    </div>
  );
};
