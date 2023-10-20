import { FC } from "react";
import notFoundStyles from "./not-found-styles.module.css";

export const NotFoundPage: FC = () => {
  return (
    <div className={notFoundStyles.notFoundContainer}>
      <h1 className="text text_type_main-large">404</h1>
      <p className="text text_type_main-medium">Страница не найдена</p>
    </div>
  );
};
