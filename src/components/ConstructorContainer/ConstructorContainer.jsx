import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import constructorContainerStyles from "./constructor-container-styles.module.css";
import PropTypes from "prop-types";
import { SelectedConstructorElement } from "../SelectedConstructorElement/SelectedConstructorElement";

import { decreaseIngredient } from "../../services/actions/constructor/decreaseIngredient";
import { increaseIngredient } from "../../services/actions/constructor/increaseIngredient";
import { addIngredient } from "../../services/actions/constructor/addIngredient";
import { deleteIngredient } from "../../services/actions/constructor/deleteIngredient";

export const ConstructorContainer = ({ containerType }) => {
  const dispatch = useDispatch();
  const ingredientsData = useSelector(
    (state) => state.constructorReducer.ingredients
  );
  const addedIngredients = useSelector(
    (state) => state.constructorReducer.addedIngredients
  );

  const handleDrop = (item, id) => {
    const selectedIngr = ingredientsData.find(
      (ingredient) => ingredient._id === item.id
    );

    dispatch(addIngredient(selectedIngr, id));
  };

  const [, dropMainSauce] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch(increaseIngredient(item.id));
      handleDrop(item, item.uuid);
    },
  });

  const [, dropBun] = useDrop({
    drop(item) {
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
                key={ingredient.uuid}
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
                ingredient={ingredient}
                key={ingredient.uuid}
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
                key={ingredient.uuid}
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
};
