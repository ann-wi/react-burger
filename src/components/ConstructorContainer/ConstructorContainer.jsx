import React, { useRef, useState, useCallback } from "react";
import update from "immutability-helper";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import constructorContainerStyles from "./constructor-container-styles.module.css";
import PropTypes from "prop-types";
import SelectedConstructorElement from "../SelectedConstructorElement/SelectedConstructorElement";

import { decreaseIngredient } from "../../services/actions/decreaseIngredient";
import { increaseIngredient } from "../../services/actions/increaseIngredient";
import SortSelectedIngredients from "../SortSelectedIngredients/SortSelectedIngredients";
import { setNewIngrs } from "../../services/actions/setIngredients";

import { addIngredient } from "../../services/actions/addIngredient";
import { moveIngredient } from "../../services/actions/moveIngredient";
import { deleteIngredient } from "../../services/actions/deleteIngredient";

import uuid from "react-uuid";

const ConstructorContainer = ({ containerType }) => {
  const dispatch = useDispatch();
  const ingredientsData = useSelector(
    (state) => state.reactBurgerReducer.ingredients
  );
  const addedIngredients = useSelector(
    (state) => state.reactBurgerReducer.addedIngredients
  );

  const handleDrop = (item, id) => {
    const selectedIngr = ingredientsData.find(
      (ingredient) => ingredient._id === item.id
    );

    //const uuidIngr = item.uuid;

    //console.log(uuidIngr);
    dispatch(addIngredient(selectedIngr, id));
  };

  const [{ isHover }, dropMainSauce] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      //dispatch(addIngredient(item, item.uuid));
      dispatch(increaseIngredient(item.id));
      handleDrop(item, item.uuid);
    },
  });

  /*
  const [, dropMainSauce] = useDrop({
    drop(item) {
      dispatch(addIngredient(item, item.uuid));
    },
    accept: "ingredient",
  });
*/
  const [, dropBun] = useDrop({
    drop(item) {
      console.log(item);
      dispatch(addIngredient(item, item.uuid));
      dispatch(increaseIngredient(item.id));
    },
    accept: "burgerBun",
  });

  const handleDeleteIngredient = (ingredient) => {
    dispatch(deleteIngredient(ingredient));
    dispatch(decreaseIngredient(ingredient._id));
  };

  const returnContainer = (type) => {
    if (type === "bun-top") {
      return (
        <div className={constructorContainerStyles.elementsBuns} ref={dropBun}>
          {addedIngredients
            .filter((ingredient) => ingredient.type === "bun")
            .map((ingredient) => (
              <SelectedConstructorElement
                key={uuid()}
                elemType={"bun-top"}
                ingredient={ingredient}
                id={ingredient._id}
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
                key={uuid()}
                ingredient={ingredient}
                elemType={"main-sauce"}
                deleteItem={handleDeleteIngredient}
                id={ingredient._id}
                index={addedIngredients.indexOf(ingredient)}
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
                key={uuid()}
                elemType={"bun-bottom"}
                ingredient={ingredient}
                id={ingredient._id}
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
