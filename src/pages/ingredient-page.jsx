import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { IngredientDetails } from "../components/IngredientDetails/IngredientDetails";
import {
  getAuthOrders,
  getOrders,
} from "../services/actions/constructor/sendGetOrder";
import IngredientPageStyles from "./ingredient-page-styles.module.css";

export const IngredientPage = () => {
  return (
    <div className={IngredientPageStyles.container}>
      <IngredientDetails />
    </div>
  );
};
