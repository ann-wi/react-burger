import { useDrag, useDrop } from "react-dnd";
import { FC, useRef } from "react";
import SelectedConstructorElementStyles from "./selected-constructor-element-styles.module.css";
import { setNewIngrs } from "../../services/actions/constructorActions";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../utils/storeTypes";
import { TIngredient } from "../../utils/types";
// import { DnDRefElement } from "../DnDRefElement/DnDRefElement";

export interface ISelectedConstructorElement {
  ingredient: TIngredient;
  elemType: string;
  deleteItem?: (ingredient: TIngredient) => void;
  index?: number | undefined;
}

export const SelectedConstructorElement: FC<ISelectedConstructorElement> = ({
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
      console.log(ingredient);
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
    drop: (item: { index: number; type: string; id: string }) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index!;

      if (dragIndex === hoverIndex) {
        return;
      }

      const dragItem = addedIngredients[dragIndex];

      const sortedIngredients = [...addedIngredients];

      const hoverItem = sortedIngredients.splice(hoverIndex, 1, dragItem);

      sortedIngredients.splice(dragIndex, 1, hoverItem[0]);
      console.log(item);
      dispatch(setNewIngrs(sortedIngredients));
    },
  });

  const ref = useRef<HTMLDivElement>(null);
  dragRef(dropRef(ref));

  const returnElement = (elemType: string) => {
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
          ref={ref}
          data-handler-id={handlerId}
          className={`${SelectedConstructorElementStyles.element} mb-4`}
        >
          <DragIcon type="primary" />
          <ConstructorElement
            text={`${name}`}
            price={price}
            thumbnail={image}
            handleClose={() => deleteItem!(ingredient)}
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
