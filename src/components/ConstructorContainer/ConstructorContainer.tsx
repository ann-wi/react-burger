import { useDrop } from "react-dnd";
import constructorContainerStyles from "./constructor-container-styles.module.css";
import { SelectedConstructorElement } from "../SelectedConstructorElement/SelectedConstructorElement";

import {
  addIngredient,
  deleteIngredient,
  decreaseIngredient,
  increaseIngredient,
} from "../../services/actions/constructorActions";
import { FC } from "react";
import { useDispatch, useSelector } from "../../utils/storeTypes";
import { TIngredient } from "../../utils/types";

export interface IConstructorContainer {
  containerType: string;
}

export const ConstructorContainer: FC<IConstructorContainer> = ({
  containerType,
}) => {
  const dispatch = useDispatch();
  const ingredientsData = useSelector(
    (state) => state.constructorReducer.ingredients
  );
  const addedIngredients = useSelector(
    (state) => state.constructorReducer.addedIngredients
  );

  const handleDrop = (item: TIngredient, id: string) => {
    const selectedIngr = ingredientsData.find(
      (ingredient) => ingredient._id === item.id
    );

    dispatch(addIngredient(selectedIngr!, id));
  };

  const [, dropMainSauce] = useDrop({
    accept: "ingredient",
    drop(item: TIngredient) {
      dispatch(increaseIngredient(item.id!));
      handleDrop(item, item.uuid);
    },
  });

  const [, dropBun] = useDrop({
    drop(item: TIngredient) {
      dispatch(addIngredient(item, item.uuid));
      dispatch(increaseIngredient(item.id!));
    },
    accept: "burgerBun",
  });

  const handleDeleteIngredient = (ingredient: TIngredient) => {
    dispatch(deleteIngredient(ingredient));
    dispatch(decreaseIngredient(ingredient._id));
  };

  const returnContainer = (type: string) => {
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
            .filter((ingredient: TIngredient) => ingredient.type !== "bun")
            .map((ingredient: TIngredient, index: number) => (
              <SelectedConstructorElement
                ingredient={ingredient}
                key={ingredient.uuid}
                elemType={"main-sauce"}
                deleteItem={handleDeleteIngredient}
                index={index}
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
