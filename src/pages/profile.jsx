import React from "react";

import profileStyles from "./profile-styles.module.css";

export const ProfilePage = () => {
  return (
    <div className={profileStyles.profile}>
      <div className={profileStyles.profilePagesLinks}>
        <button>
          <h2>Профиль</h2>
        </button>
        <button>
          <h2>История заказов</h2>
        </button>
        <button>
          <h2>Выход</h2>
        </button>
        <p>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <form action="" className={profileStyles.profileForm}>
        <label>
          Имя
          <input type="text" />
          <button type="submit">O</button>
        </label>
        <label>
          Логин
          <input type="text" />
          <button type="submit">O</button>
        </label>
        <label>
          Пароль
          <input type="password" />
          <button type="submit">O</button>
        </label>
      </form>
    </div>
  );
};
