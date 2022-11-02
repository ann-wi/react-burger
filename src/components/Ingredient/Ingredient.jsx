import { useDrag } from "react-dnd";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient-styles.module.css";

const Ingredient = ({ ingredient, onClickPopup }) => {
  // Draggable element
  const { _id } = ingredient;

  const [{ isDrag }, dragRef] = useDrag({
    type: "sauce",
    item: { _id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <div className={ingredientStyles.card} ref={dragRef} draggable>
      <img
        onClick={() => console.log(ingredient)}
        src={ingredient.image}
        className={`${ingredientStyles.image} mr-4 ml-4`}
        alt={`ingredient_image`}
      />
      <div
        className={`${ingredientStyles.price} pt-1 pb-1 text text_type_digits-default`}
      >
        <p className={ingredientStyles.priceNum}>{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p
        className={`${ingredientStyles.name} mt-1 text text_type_main-default`}
      >
        {ingredient.name}
      </p>
    </div>
  );
};

export default Ingredient;
