import { useDrag, useDrop } from "react-dnd";
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
import uuid from "react-uuid";

const SelectedConstructorElement = ({ ingredient, elemType, handleClose }) => {
  const dispatch = useDispatch();
  const [itemId, setItemId] = useState(0);

  const addedIngredients = useSelector(
    (state) => state.reactBurgerReducer.addedIngredients
  );

  const { name, price, image, type } = ingredient;

  const [, dragRef] = useDrag({
    type: type,
    item: {
      uuid: uuid(),
      name: name,
      price: price,
      image: image,
      type: type,
    },
  });

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
      return (
        <div
          key={uuid}
          ref={dragRef}
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
            text={`${name} (верх)`}
            price={price}
            thumbnail={image}
            handleClose
          />
        </div>
      );
    } else if (elemType === "main-sauce") {
      return (
        <div
          draggable
          key={uuid}
          ref={dragRef}
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
            text={`${name}`}
            price={price}
            thumbnail={image}
            handleClose={handleClose}
          />
        </div>
      );
    } else if (elemType === "bun-bottom") {
      return (
        <div
          key={uuid}
          ref={dragRef}
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
            text={`${name} (низ)`}
            price={price}
            thumbnail={image}
          />
        </div>
      );
    }
  };

  return <>{returnElement(elemType)}</>;
};

export default SelectedConstructorElement;

// handleDrop(addedIngredients.indexOf(ingredient));
