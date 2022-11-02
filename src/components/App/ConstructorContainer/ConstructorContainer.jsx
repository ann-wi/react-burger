import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorContainerStyles from "./constructor-container-styles.module.css";

import { addIngredient } from "../../../services/actions/addIngredient";

const ConstructorContainer = ({ containerType }) => {
  const dispatch = useDispatch();
  const addedIngredients = useSelector(
    (state) => state.reactBurgerReducer.addedIngredients
  );

  const [{ canDrop }, dropTarget] = useDrop({
    drop(item, monitor) {
      dispatch(addIngredient(item));
      console.log(addedIngredients);
    },
    accept: "sauce",
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div className={constructorContainerStyles.elements} ref={dropTarget}>
      {addedIngredients.map((ingredient, index) => (
        <div
          key={index}
          className={`${constructorContainerStyles.element} mb-4`}
        >
          <DragIcon type="primary" />
          <ConstructorElement
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
          />
        </div>
      ))}
    </div>
  );
};

export default ConstructorContainer;
