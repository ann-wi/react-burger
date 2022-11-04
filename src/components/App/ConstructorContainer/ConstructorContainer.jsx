import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorContainerStyles from "./constructor-container-styles.module.css";

import { addIngredient } from "../../../services/actions/addIngredient";
import { moveIngredient } from "../../../services/actions/moveIngredient";
import { setDragItemId } from "../../../services/actions/setDragItemId";

const ConstructorContainer = ({ containerType }) => {
  const dispatch = useDispatch();
  const addedIngredients = useSelector(
    (state) => state.reactBurgerReducer.addedIngredients
  );
  const [itemId, setItemId] = useState(0);

  const dragId = useSelector((state) => state.reactBurgerReducer.draggedItemId);

  const acceptType = ["sauce", "main"];

  const [{ canDrop }, dropMainSauce] = useDrop({
    drop(item, monitor) {
      dispatch(addIngredient(item));
    },
    accept: ["sauce", "main"],
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  });

  const [, dropBun] = useDrop({
    drop(item) {
      dispatch(addIngredient(item));
    },
    accept: "bun",
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

  const returnContainer = (type) => {
    if (type === "bun-top") {
      return (
        <div className={constructorContainerStyles.elements} ref={dropBun}>
          {addedIngredients.map((ingredient, index) => (
            <div
              key={index}
              className={`${constructorContainerStyles.elementBun} mb-4 mr-4`}
              onDragStart={() => {
                handleDrag(addedIngredients.indexOf(ingredient));
              }}
              onDrop={() => handleDrop(addedIngredients.indexOf(ingredient))}
            >
              <ConstructorElement
                key={index}
                type="top"
                isLocked={true}
                text={`${ingredient.name} (верх)`}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </div>
          ))}
        </div>
      );
    } else if (type === "main-sauce") {
      return (
        <div
          className={constructorContainerStyles.elements}
          ref={dropMainSauce}
        >
          {addedIngredients
            .filter((ingredient) => ingredient.type !== "bun")
            .map((ingredient, index) => (
              <div
                key={index}
                className={`${constructorContainerStyles.element} mb-4`}
                onDragStart={() => {
                  handleDrag(addedIngredients.indexOf(ingredient));
                }}
                onDrop={() => handleDrop(addedIngredients.indexOf(ingredient))}
              >
                <DragIcon type="primary" draggable={true} />
                <ConstructorElement
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                />
              </div>
            ))}
        </div>
      );
    } else if (type === "bun-bottom") {
      return (
        <div className={constructorContainerStyles.elements} ref={dropBun}>
          {addedIngredients.map((ingredient, index) => (
            <div
              key={index}
              className={`${constructorContainerStyles.elementBun} mb-4 mr-4`}
              onDragStart={() => {
                handleDrag(addedIngredients.indexOf(ingredient));
              }}
              onDrop={() => handleDrop(addedIngredients.indexOf(ingredient))}
            >
              <ConstructorElement
                key={index}
                type="bottom"
                isLocked={true}
                text={`${ingredient.name} (низ)`}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </div>
          ))}
        </div>
      );
    }
  };

  return [returnContainer(containerType)];
};

export default ConstructorContainer;

//[returnContainer(containerType)]
//<div className={constructorStyles.elements} ref={dropBun} containerType={"bun-top"}>
//</div>
