import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import constructorContainerStyles from "./constructor-container-styles.module.css";
import PropTypes from "prop-types";
import SelectedConstructorElement from "../SelectedConstructorElement/SelectedConstructorElement";

import { addIngredient } from "../../services/actions/addIngredient";
import { moveIngredient } from "../../services/actions/moveIngredient";

const ConstructorContainer = ({ containerType, handleDeleteIngredient }) => {
  const dispatch = useDispatch();
  const addedIngredients = useSelector(
    (state) => state.reactBurgerReducer.addedIngredients
  );
  //const [itemId, setItemId] = useState(0);

  const [, dropMainSauce] = useDrop({
    drop(item) {
      dispatch(addIngredient(item, item.uuid));
    },
    accept: ["sauce", "main"],
  });

  const [, dropBun] = useDrop({
    drop(item) {
      dispatch(addIngredient(item, item.uuid));
    },
    accept: "bun",
  });

  //const handleDrop = (currIngr) => {
  //  let sortItems = [...addedIngredients];
  //
  //  const dragItem = sortItems.find(
  //    (item) => sortItems.indexOf(item) === itemId
  //  );
  //  const dropItem = sortItems.find(
  //    (item) => sortItems.indexOf(item) === currIngr
  //  );
  //
  //  let dragItemOrder = sortItems.indexOf(dragItem);
  //   let dropItemOrder = sortItems.indexOf(dropItem);
  //
  //  const remAndSavDrag = sortItems.splice(dragItemOrder, 1)[0];
  //  sortItems.splice(dropItemOrder, 0, remAndSavDrag);
  //
  //  dispatch(moveIngredient(sortItems));
  //};

  //const handleDrag = (currIngr) => {
  //  setItemId(currIngr);
  //};

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
