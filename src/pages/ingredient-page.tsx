import { FC } from "react";
import { IngredientDetails } from "../components/IngredientDetails/IngredientDetails";
import IngredientPageStyles from "./ingredient-page-styles.module.css";

export const IngredientPage: FC = () => {
  return (
    <div className={IngredientPageStyles.container}>
      <IngredientDetails />
    </div>
  );
};
