import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import constructorContainerStyles from "./constructor-container-styles.module.css";
import PropTypes from "prop-types";
import SelectedConstructorElement from "../SelectedConstructorElement/SelectedConstructorElement";

import { addIngredient } from "../../services/actions/addIngredient";
import { deleteIngredient } from "../../services/actions/deleteIngredient";
import { getCounterNumber } from "../../services/actions/getCounterNumber";

const ConstructorContainer = ({ containerType }) => {
  const dispatch = useDispatch();
  const addedIngredients = useSelector(
    (state) => state.reactBurgerReducer.addedIngredients
  );

  const [, dropMainSauce] = useDrop({
    drop(item) {
      dispatch(addIngredient(item, item.uuid));
    },
    accept: "ingredient",
  });

  const [, dropBun] = useDrop({
    drop(item) {
      dispatch(addIngredient(item, item.uuid));
    },
    accept: "burgerBun",
  });

  const handleDeleteIngredient = (ingredient) => {
    dispatch(deleteIngredient(ingredient));
  };

  const returnContainer = (type) => {
    if (type === "bun-top") {
      return (
        <div className={constructorContainerStyles.elementsBuns} ref={dropBun}>
          {addedIngredients
            .filter((ingredient) => ingredient.type === "bun")
            .map((ingredient) => (
              <SelectedConstructorElement
                key={ingredient.uuid}
                elemType={"bun-top"}
                ingredient={ingredient}
              />
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
            .map((ingredient) => (
              <SelectedConstructorElement
                key={ingredient.uuid}
                ingredient={ingredient}
                elemType={"main-sauce"}
                deleteItem={handleDeleteIngredient}
              />
            ))}
        </div>
      );
    } else if (type === "bun-bottom") {
      return (
        <div
          className={`${constructorContainerStyles.elementsBuns} mb-4 mr-4`}
          ref={dropBun}
        >
          {addedIngredients
            .filter((ingredient) => ingredient.type === "bun")
            .map((ingredient) => (
              <SelectedConstructorElement
                key={ingredient.uuid}
                elemType={"bun-bottom"}
                ingredient={ingredient}
              />
            ))}
        </div>
      );
    }
  };

  return (
    <div className={constructorContainerStyles.containers}>
      {returnContainer(containerType)}
    </div>
  );
};

ConstructorContainer.propTypes = {
  containerType: PropTypes.string,
  handleDeleteIngredient: PropTypes.func,
};

export default ConstructorContainer;
