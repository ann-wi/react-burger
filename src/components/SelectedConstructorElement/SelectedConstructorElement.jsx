import { useDrag, useDrop } from "react-dnd";
import { useCallback, useRef, useState } from "react";
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

import { setNewIngrs } from "../../services/actions/setIngredients";

const SelectedConstructorElement = ({
  ingredient,
  elemType,
  deleteItem,
  moveElem,
  findElem,
  index,
}) => {
  const dispatch = useDispatch();

  const { id, name, price, image, type, uuid } = ingredient;

  const addedIngredients = useSelector(
    (state) => state.reactBurgerReducer.addedIngredients
  );

  const sortItems = (dragIndex, hoverIndex, selectedIngredients) => {
    const dragItem = selectedIngredients[dragIndex];

    const sortedIngredients = [...selectedIngredients];

    const hoverItem = sortedIngredients.splice(hoverIndex, 1, dragItem);

    sortedIngredients.splice(dragIndex, 1, hoverItem[0]);

    //console.log(selectedIngredients);
    dispatch(setNewIngrs(sortedIngredients));
  };

  //const moveIngrs = (dragIndex, hoverIndex, addedIngredients) => {
  //  dispatch(sortItems(dragIndex, hoverIndex, addedIngredients));
  //};

  const [{ isDragging }, dragRef] = useDrag({
    type: "selected",
    item: () => {
      return ingredient;
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, dropRef] = useDrop({
    accept: "selected",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    drop: (item, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = addedIngredients.indexOf(item);
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      console.log(item);

      dispatch(sortItems(dragIndex, hoverIndex, addedIngredients));

      dragIndex = hoverIndex;
    },
  });

  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));
  const opacity = isDragging ? 0 : 1;

  /*
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
*/

  /*
  const findElement = useCallback(
    (id) => {
      const selectedElement = addedIngredients.filter(
        (elem) => `${elem.id}` === id
      )[0];
      return {
        selectedElement,
        idx: addedIngredients.indexOf(selectedElement),
      };
    },
    [addedIngredients]
  );
  */

  /*
  const moveSelectedIngredient = useCallback((id, atIndex) => {
    const { selectedElement, idx } = findElement(id);

    const newSort = addedIngredients.splice(selectedElement, 1);

    dispatch(moveIngredient(newSort));
    console.log(newSort);
    //dispatch(moveIngredient())
  });
*/

  /*
  const originalIdx = findElem(id).idx;

  const [, drag] = useDrag(
    () => ({
      type: type,
      item: { id, originalIdx },
      end: (item, monitor) => {
        console.log(originalIdx);
        console.log(addedIngredients);
        
        //const { id: droppedId, originalIdx } = item;
        //const didDrop = monitor.didDrop();

        //if (didDrop) {
        //  moveElem(droppedId, originalIdx);
        //}
        
      },
    }),
    [id, originalIdx, moveElem]
  );

  const eleme = findElem(id).SelectedElement;

  const [, drop] = useDrop(
    () => ({
      accept: type,
      hover: (item, monitor) => {
        const isOver = monitor.isOver();
        const { id: draggedId } = item;
        if (isOver) {
          const { index: overIndex } = findElem(id);
          moveElem(draggedId, overIndex);
          console.log(overIndex);
        }
      },
      drop: (item, monitor) => {
        const didDrop = monitor.didDrop();
        const { id: draggedId } = item;
        if (didDrop) {
          const { index: overIndex } = findElem(id);
          moveElem(draggedId, overIndex);
        }
      },
    }),
    [findElem, moveElem]
  );
*/

  /*
  const [{ isHover }, drop] = useDrop({
    accept: type,
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      const { id: draggedId } = item;
      const { index: overIndex } = findElem(id);

      moveElem(draggedId, overIndex);
    },
  });
  */

  const returnElement = (elemType) => {
    if (elemType === "bun-top") {
      return (
        <div
          className={`${SelectedConstructorElementStyles.elementBun} mb-4 mr-4`}
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
          ref={dragDropRef}
          data-handler-id={handlerId}
          className={`${SelectedConstructorElementStyles.element} mb-4`}
        >
          <DragIcon type="primary" />
          <ConstructorElement
            text={`${name}`}
            price={price}
            thumbnail={image}
            handleClose={() => deleteItem(ingredient)}
            index={index}
          />
        </div>
      );
    } else if (elemType === "bun-bottom") {
      return (
        <div
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
