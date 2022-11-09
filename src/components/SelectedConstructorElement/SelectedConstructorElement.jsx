import { useDrop } from "react-dnd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import SelectedConstructorElementStyles from "./selected-constructor-element-styles.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { moveIngredient } from "../../services/actions/moveIngredient";
import Ingredient from "../Ingredient/Ingredient";

const SelectedConstructorElement = ({
  onDragStart,
  onDrop,
  name,
  price,
  thumbnail,
  id,
  uuid,
  elemType,
  handleClose,
}) => {
  const dispatch = useDispatch();
  const [itemId, setItemId] = useState(0);

  const addedIngredients = useSelector(
    (state) => state.reactBurgerReducer.addedIngredients
  );

  const handleDrop = (currIngr) => {
    let sortItems = [...addedIngredients];

    const dragItem = sortItems.find(
      (item) => sortItems.indexOf(item) === itemId
    );
    const dropItem = sortItems.find(
      (item) => sortItems.indexOf(item) === currIngr
    );

    let dragItemOrder = sortItems.indexOf(dragItem);
    let dropItemOrder = sortItems.indexOf(dropItem);

    const remAndSavDrag = sortItems.splice(dragItemOrder, 1)[0];
    sortItems.splice(dropItemOrder, 0, remAndSavDrag);

    dispatch(moveIngredient(sortItems));
  };

  const handleDrag = (currIngr) => {
    setItemId(currIngr);
  };

  const returnElement = (elemType) => {
    if (elemType === "bun-top") {
      return addedIngredients
        .filter((ingredient) => ingredient.type === "bun")
        .map((ingredient) => (
          <div
            key={ingredient.uuid}
            className={`${SelectedConstructorElementStyles.elementBun} mb-4 mr-4`}
            onDragStart={(e) => {
              console.log(e.currentTarget);
              handleDrag(addedIngredients.indexOf(ingredient));
            }}
            onDrop={(e) => {
              console.log(e.currentTarget);
              handleDrop(addedIngredients.indexOf(ingredient));
            }}
          >
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${ingredient.name} (верх)`}
              price={ingredient.price}
              thumbnail={ingredient.image}
              handleClose
            />
          </div>
        ));
    } else if (elemType === "main-sauce") {
      return addedIngredients
        .filter((ingredient) => ingredient.type !== "bun")
        .map((ingredient) => (
          <div
            key={ingredient.uuid}
            className={`${SelectedConstructorElementStyles.element} mb-4`}
            onDragStart={(e) => {
              console.log(e.currentTarget);
              handleDrag(addedIngredients.indexOf(ingredient));
            }}
            onDrop={(e) => {
              console.log(e.currentTarget);
              handleDrop(addedIngredients.indexOf(ingredient));
            }}
          >
            <DragIcon type="primary" />
            <ConstructorElement
              text={`${ingredient.name}`}
              price={ingredient.price}
              thumbnail={ingredient.image}
              handleClose={handleClose}
            />
          </div>
        ));
    } else if (elemType === "bun-bottom") {
      return addedIngredients
        .filter((ingredient) => ingredient.type === "bun")
        .map((ingredient) => (
          <div
            key={ingredient.uuid}
            className={`${SelectedConstructorElementStyles.elementBun} mb-4 mr-4`}
            onDragStart={(e) => {
              console.log(e.currentTarget);
              handleDrag(addedIngredients.indexOf(ingredient));
            }}
            onDrop={(e) => {
              console.log(e.currentTarget);
              handleDrop(addedIngredients.indexOf(ingredient));
            }}
          >
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${ingredient.name} (низ)`}
              price={ingredient.price}
              thumbnail={ingredient.image}
            />
          </div>
        ));
    }
  };

  return <>{returnElement(elemType)}</>;
};

export default SelectedConstructorElement;

// handleDrop(addedIngredients.indexOf(ingredient));
