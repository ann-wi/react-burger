import { setNewIngrs } from "../../services/actions/setIngredients";
import { useDispatch } from "react-redux";

const SortSelectedIngredients = ({
  dragIndex,
  hoverIndex,
  selectedIngredients,
}) => {
  const dispatch = useDispatch();

  return function () {
    const dragItem = selectedIngredients[dragIndex];

    const sortedIngredients = [...selectedIngredients];

    const hoverItem = sortedIngredients.splice(hoverIndex, 1, dragItem);

    sortedIngredients.splice(dragIndex, 1, hoverItem[0]);

    console.log(selectedIngredients);
    dispatch(setNewIngrs(sortedIngredients));
  };
};

export default SortSelectedIngredients;
