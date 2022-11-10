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

const SelectedConstructorElement = ({ ingredient, elemType, deleteItem }) => {
  const dispatch = useDispatch();

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

    sortedItems.splice(dragOverItem.current, 0, draggedItem);

    dragItem.current = null;
    dragOverItem.current = null;

    dispatch(moveIngredient(sortedItems));
  };

  const returnElement = (elemType) => {
    if (elemType === "bun-top") {
      return (
        <div
          key={uuid}
          ref={dragRef}
          className={`${SelectedConstructorElementStyles.elementBun} mb-4 mr-4`}
          onDragStart={(e) =>
            (dragItem.current = addedIngredients.indexOf(e.currentTarget))
          }
          onDragEnter={(e) =>
            (dragOverItem.current = addedIngredients.indexOf(e.currentTarget))
          }
          onDragOver={(e) => e.preventDefault()}
          onDragEnd={handleDrop}
        >
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${name} (верх)`}
            price={price}
            thumbnail={image}
          />
        </div>
      );
    } else if (elemType === "main-sauce") {
      return (
        <div
          key={uuid}
          ref={dragRef}
          className={`${SelectedConstructorElementStyles.element} mb-4`}
          onDragStart={(e) =>
            (dragItem.current = addedIngredients.indexOf(e.currentTarget))
          }
          onDragEnter={(e) =>
            (dragOverItem.current = addedIngredients.indexOf(e.currentTarget))
          }
          onDragOver={(e) => e.preventDefault()}
          onDragEnd={handleDrop}
        >
          <DragIcon type="primary" />
          <ConstructorElement
            text={`${name}`}
            price={price}
            thumbnail={image}
            handleClose={() => deleteItem(ingredient)}
          />
        </div>
      );
    } else if (elemType === "bun-bottom") {
      return (
        <div
          key={uuid}
          ref={dragRef}
          className={`${SelectedConstructorElementStyles.elementBun} mb-4 mr-4`}
          onDragStart={(e) =>
            (dragItem.current = addedIngredients.indexOf(e.currentTarget))
          }
          onDragEnter={(e) =>
            (dragOverItem.current = addedIngredients.indexOf(e.currentTarget))
          }
          onDragOver={(e) => e.preventDefault()}
          onDragEnd={handleDrop}
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
