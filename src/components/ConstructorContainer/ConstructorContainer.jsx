import React, { useRef, useState, useCallback } from "react";
import update from "immutability-helper";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import constructorContainerStyles from "./constructor-container-styles.module.css";
import PropTypes from "prop-types";
import SelectedConstructorElement from "../SelectedConstructorElement/SelectedConstructorElement";

import { addIngredient } from "../../services/actions/addIngredient";
import { moveIngredient } from "../../services/actions/moveIngredient";
import { deleteIngredient } from "../../services/actions/deleteIngredient";

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

  const findElement = useCallback(
    (id) => {
      const selectedElement = addedIngredients.filter(
        (elem) => elem.id === id
      )[0];
      //console.log(addedIngredients.indexOf(selectedElement));
      return {
        selectedElement,
        idx: addedIngredients.indexOf(selectedElement),
      };
    },
    [addedIngredients]
  );

  const moveSelectedIngredient = useCallback(
    (id, atIndex) => {
      const { selectedElement, idx } = findElement(id);

      dispatch(
        moveIngredient(
          update(addedIngredients, {
            $splice: [
              [idx, 1],
              [atIndex, 0, selectedElement],
            ],
          })
        )
      );
    },
    [findElement, addedIngredients, dispatch]
  );

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
                id={ingredient._id}
                findElem={findElement}
                moveElem={moveSelectedIngredient}
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
                id={ingredient._id}
                findElem={findElement}
                moveElem={moveSelectedIngredient}
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
                id={ingredient._id}
                findElem={findElement}
                moveElem={moveSelectedIngredient}
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
