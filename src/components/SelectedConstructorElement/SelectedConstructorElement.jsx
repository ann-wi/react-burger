import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectedConstructorElementStyles from "./selected-constructor-element-styles.module.css";
import { setNewIngrs } from "../../services/actions/constructor/setIngredients";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

export const SelectedConstructorElement = ({
  ingredient,
  elemType,
  deleteItem,
  index,
}) => {
  const dispatch = useDispatch();

  const { name, price, image } = ingredient;

  const addedIngredients = useSelector(
    (state) => state.constructorReducer.addedIngredients
  );

  const [, dragRef] = useDrag({
    type: "selected",
    item: () => {
      return ingredient;
    },
  });

  const [{ handlerId }, dropRef] = useDrop({
    accept: "selected",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    drop: (item) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = addedIngredients.indexOf(item);
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const dragItem = addedIngredients[dragIndex];

      const sortedIngredients = [...addedIngredients];

      const hoverItem = sortedIngredients.splice(hoverIndex, 1, dragItem);

      sortedIngredients.splice(dragIndex, 1, hoverItem[0]);

      dispatch(setNewIngrs(sortedIngredients));
    },
  });

  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));

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

SelectedConstructorElement.propTypes = {
  ingredient: PropTypes.object,
  elemType: PropTypes.string,
  deleteItem: PropTypes.func,
  index: PropTypes.number,
};
