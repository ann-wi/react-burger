import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorContainerStyles from "./constructor-container-styles.module.css";
import { Scrollbar } from "smooth-scrollbar-react";

import { addIngredient } from "../../../services/actions/addIngredient";

const ConstructorContainer = ({ containerType, content }) => {
  const dispatch = useDispatch();
  // Drop container
  const addedIngredients = useSelector(
    (state) => state.reactBurgerReducer.addedIngredients
  );

  const [{ isOver }, dropTarget] = useDrop({
    drop(_id) {
      console.log(addedIngredients);
      dispatch(addIngredient(_id));
    },
    accept: "sauce",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
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

// <Scrollbar damping={0.07}>{content}</Scrollbar>
