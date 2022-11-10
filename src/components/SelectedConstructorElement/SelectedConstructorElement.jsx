import { useDrag, useDrop } from "react-dnd";
import { useRef, useState } from "react";
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

  const { id, name, price, image, type } = ingredient;

  const [, dragRef] = useDrag({
    type: type,
    item: {
      id: id,
      name: name,
      price: price,
      image: image,
      type: type,
      uuid: uuid(),
    },
  });

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleDrop = () => {
    let sortedItems = [...addedIngredients];

    const draggedItem = sortedItems.splice(dragItem.current, 1)[0];

    console.log(sortedItems.indexOf(draggedItem));

    sortedItems.splice(dragOverItem.current, 0, draggedItem);
    console.log(sortedItems);

    dragItem.current = null;
    dragOverItem.current = null;

    dispatch(moveIngredient(sortedItems));
  };

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
  //  let dropItemOrder = sortItems.indexOf(dropItem);

  //  const remAndSavDrag = sortItems.splice(dragItemOrder, 1)[0];
  //  sortItems.splice(dropItemOrder, 0, remAndSavDrag);

  //  dispatch(moveIngredient(sortItems));
  //};

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
          key={uuid}
          ref={dragRef}
          className={`${SelectedConstructorElementStyles.element} mb-4`}
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
